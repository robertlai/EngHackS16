import React from 'react';
import d3 from 'd3';
import jquery from 'jquery';
import io from 'socket.io-client';
import {getUser} from 'core/utils';
import _ from 'lodash';

class MainView extends React.Component {
	constructor(props) {
		super(props);
		this.socket = io();

		this.realJSONNodes = {
			nodes: [],
			links: []
		};

		this.messageSelected = null;
		this.messageSelectedId = null;

		this.initSockets();
	}
	initSockets() {
		this.socket.on('receivedChildren', (node) => {
			node._children.forEach((child) => {
				this.socket.emit('getChildren', child._id);

				this.realJSONNodes.nodes.push(this.CreateNode(child));
				this.realJSONNodes.links.push({
					'source': _.findIndex(this.realJSONNodes.nodes, (lookingAt) => {
						return lookingAt._id == node._id;
					}),
					'target': _.findIndex(this.realJSONNodes.nodes, (lookingAt) => {
						return lookingAt._id == child._id;
					})
				});
				if(node.isLiveMessage && child._owner._id == this.user._id) {
					this.createGraph();
					this.deselectSelectedNode();
					this.messageSelected = d3.select(jquery(`#${child._id}`).get(0)).select('rect').classed('selectedNode', true);
					this.messageSelectedId = child._id;
					var dataTemp = this.messageSelected.datum();
					dataTemp.fixed = true;
					this.focusLocation(-dataTemp.x + window.innerWidth / 2, -dataTemp.y + window.innerHeight / 2, true);
				}
			});
			this.createGraph();
		});

		this.socket.on('setRootNode', (rootNode) => {
			this.realJSONNodes.nodes.push(this.CreateNode(rootNode));
			this.socket.emit('getChildren', rootNode._id);
		});

		getUser().then((json) => {
			this.user = json.user;
			this.socket.emit('conversationConnect', json.user, this.props.params.cid);
		});
	}
	shouldComponentUpdate() {
		return false;
	}
	addNewMessage() {
		let text = this.refs.inputBox.value.trim();
		if(this.messageSelectedId && text != '') {
			this.socket.emit('newMessage', this.user._id, this.messageSelectedId, text);
			this.refs.inputBox.value = '';
		}
	}
	componentDidMount() {
		this.refs.inputBox.focus();
		var c = document.createElement('canvas');
		var ctx = c.getContext('2d');
		ctx.font = '20px sans-serif';

		function getHeight(textIn) {
			var text = jquery('<span>' + textIn + '</span>').css({ fontFamily: 'sans-serif','font-size':'20px' });
			var block = jquery('<div style="display: inline-block; width: 1px; height: 0px;"></div>');

			var div = jquery('<div style="width:200px"></div>');
			div.append(text, block);

			var body = jquery('body');
			body.append(div);

			try {

				var result = {};

				block.css({ verticalAlign: 'baseline' });
				result.ascent = block.offset().top - text.offset().top;

				block.css({ verticalAlign: 'bottom' });
				result.height = block.offset().top - text.offset().top;

				result.descent = result.height - result.ascent;

			} finally {
				div.remove();
			}
			return result;
		}

		this.CreateNode = (nodeData) => {
			return {
				'_id': nodeData._id,
				'text': nodeData.content,
				'_owner': nodeData._owner.username,
				'x': 0,
				'y': 0,
				'width': Math.min(ctx.measureText((nodeData.content + ' - ' + nodeData._owner.username).replace(/ +(?= )/g,'')).width, 200) + 40,
				'height': getHeight(nodeData.content + ' - ' + nodeData._owner.username).height + 20
			};
		};

		// d3 stuff
		var zoom = d3.behavior.zoom()
			.scaleExtent([0.01, 1])
			.on('zoom', function(){
				svg.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
			});

		var width = window.innerWidth;
		var height = window.innerHeight;

		this.deselectSelectedNode = () => {
			if(this.messageSelected) {
				this.messageSelected.classed('selectedNode', false).attr('fixed',false);
				this.messageSelected.datum().fixed = false;
				this.messageSelectedId = null;
			}
		};

		var self = this;

		var messageClicked = function(message) {
			if (d3.event.defaultPrevented)
				return;
			self.deselectSelectedNode();
			self.messageSelected = d3.select(this).select('rect').classed('selectedNode', true);
			self.messageSelectedId = message._id;
			message.fixed = true;
			var x = (-message.x + window.innerWidth / 2);
			var y = (-message.y + window.innerHeight / 2);
			self.focusLocation(x, y);
		};

		jquery(document).keyup((e) => {
			if (e.keyCode == 27) {
				this.deselectSelectedNode();
			}
		});

		var svg = d3.select('#root-message-anchor')
					.append('svg')
					.attr('width',width)
					.attr('height',height)
					.call(zoom)
					.on('dblclick.zoom', null)
					.append('g');

		this.focusLocation = (x, y, scaleTo1) => {
			svg.transition().attr('transform', 'translate(' + x + ','+ y + ')' + (scaleTo1 ? 'scale(1)' : ''));
		};

		svg.append('g').attr('class', 'links');
		svg.append('g').attr('class', 'nodes');

		var tick = function() {
			link.selectAll('line')
				.attr('x1', function(d) { return d.source.x; })
				.attr('y1', function(d) { return d.source.y; })
				.attr('x2', function(d) { return d.target.x; })
				.attr('y2', function(d) { return d.target.y; });

			node.attr('transform', function(d) {return 'translate(' + d.x + ',' + d.y + ')'; });
		};

		var force = d3.layout.force()
			.nodes(this.realJSONNodes.nodes)
			.links(this.realJSONNodes.links)
			.size([width,height])
			.charge(-25000)
			.linkDistance(40)
			.on('tick', tick);

		force.drag()
			.on('dragstart', function() {
				d3.event.sourceEvent.stopPropagation();
			});

		var node = svg.select('.nodes').selectAll('.node');
		var link = svg.select('.links').selectAll('.link');

		function wrap(text, width) {
			text.each(function() {
				var text = d3.select(this),
					words = text.text().split(/\s+/).reverse(),
					word,
					line = [],
					y = text.attr('y'),
					dy = parseFloat(text.attr('dy')),
					tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');
				while (word = words.pop()) {
					line.push(word);
					tspan.text(line.join(' '));
					if (tspan.node().getComputedTextLength() > width) {
						line.pop();
						tspan.text(line.join(' '));
						line = [word];
						tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', dy * 3 + 'em').text(word);
					}
				}
			});
		}

		this.createGraph = () => {

			link = link.data(this.realJSONNodes.links);

			link.enter()
				.append('g')
				.attr('class','link')
				.each(function() {
					d3.select(this).insert('line', '.node');
				});
			link.exit().remove();

			node = node.data(this.realJSONNodes.nodes);

			node.enter()
				.append('g')
				.attr('class', 'node')
				.style('cursor', 'pointer')
				.attr('id', (d) => {
					return d._id;
				})
				.on('click', messageClicked)
				.each(function() {
					d3.select(this).append('rect')
						.attr('rx',5)
						.attr('ry',5)
						.style('transform', function(d) { return 'translate(-' + d.width/ 2 + 'px,-23px)';})
						.attr('width', function(d) { return d.width; })
						.attr('height', function(d) { return d.height; });

					d3.select(this)
						.append('text')
						.attr('dy', '.35em')
						.attr('text-anchor', 'middle')
						.text(function(d) { return d.text + ' - ' + d._owner; })
						.call(wrap, 200);

			});
			node.exit().remove();

			force.start();
		};

	}
	render() {
		return (
			<div>
				<div id='root-message-anchor'></div>
				<div id='bottom-bar'>
					<input
						id='message-text-box'
						type='text'
						ref='inputBox'
						autoComplete='off'
						onKeyPress={ (e) => {
							if(e.key == 'Enter') {
								this.addNewMessage();
							}
						}}
						onBlur={ () => {
							setTimeout(() => { this.refs.inputBox.focus(); }, 20);
						}}
					/>
					<button id='send-message-button' onClick={this.addNewMessage}>Send</button>
				</div>
			</div>
		);
	}
}

export default MainView;
