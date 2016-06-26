import React from 'react';
import test from '../test';
import Message from 'components/message';
import InputBox from 'components/inputBox';
import d3 from 'd3';
import jquery from 'jquery';
import io from 'socket.io-client';
import {getUser} from 'core/utils';
import _ from 'lodash';

var socket = require('socket.io-client')();

const MainView = React.createClass({
	shouldComponentUpdate() {
		return false;
	},
	realJSONNodes: {
		nodes: [],
		links: []
	},
	messageSelected: null,
	messageSelectedId: null,
	addNewMessage() {
		let text = this.refs.inputBox.value.trim();
		if(this.messageSelectedId && text != '') {
			socket.emit('newMessage', this.user._id, this.messageSelectedId, text);
			this.refs.inputBox.value = '';
		}
	},
	componentDidMount() {
		this.refs.inputBox.focus();

		socket.on('receivedChildren', (node) => {
			node._children.forEach((child) => {

				var c=document.createElement('canvas');
			  	var ctx=c.getContext('2d');
			  	ctx.font =  '20px sans-serif';

				this.realJSONNodes.nodes.push({
					"_id": child._id,
					"text": child.content,
					"size": 12,
					"x": 0,
					"y": 0,
					"width": ctx.measureText(child.content.replace(/ +(?= )/g,'')).width + 40
				});
				this.realJSONNodes.links.push({
					"source": _.findIndex(this.realJSONNodes.nodes, (lookingAt) => {
						return lookingAt._id == node._id;
					}),
					"target": _.findIndex(this.realJSONNodes.nodes, (lookingAt) => {
						return lookingAt._id == child._id;
					}),
				});
				if(node.doIt && node._owner == this.user._id) {
					this.createGraph();
					if(self.messageSelected) {
						self.messageSelected.classed('selectedNode', false);
					}
					this.messageSelected = d3.select(jquery(`#${child._id}`).get(0)).select("rect").classed('selectedNode', true);
					this.messageSelectedId = child._id;
				}
				socket.emit('getChildren', child._id);
			});
			this.createGraph();
		});
		socket.on('setGroupId', (groupId) => {
			this.realJSONNodes.nodes.push({
				"_id": "576f871b8fbcefd0249f0ddb",
				"text": "root node",
				"size": 12,
				"x": 0,
				"y": 0,
			});
			socket.emit('getChildren', '576f871b8fbcefd0249f0ddb');
		});
		// socket.on('notAllowed', () => {
		// 	console.log('NOT OK');
		// });
		getUser().then((json) => {
			this.user = json.user;
			socket.emit('conversationConnect', json.user);
		});

		// d3 stuff
		var color = d3.scale.category20();
		var radius = d3.scale.sqrt().range([20, 30]);

		var zoom = d3.behavior.zoom()
			.scaleExtent([0.1, 1])
			.on("zoom", zoomed);

		var width = window.innerWidth;
		var height = window.innerHeight;

		var self = this;

		var messageClicked = function (message) {
			if (d3.event.defaultPrevented) return;
			if(self.messageSelected) {
				self.messageSelected.classed('selectedNode', false);
			}
			self.messageSelected = d3.select(this).select("rect").classed('selectedNode', true);
			self.messageSelectedId = message._id;
		};

		var svg = d3.select('#root-message-anchor')
					.append('svg')
					.attr("width",width)
					.attr("height",height)
					.call(zoom)
					.append('g');

		svg.append("g").attr("class", "links");
		svg.append("g").attr("class", "nodes");

		var tick = function() {
			link.selectAll("line")
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

			node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; });
		}

		var force = d3.layout.force()
			.nodes(this.realJSONNodes.nodes)
			.links(this.realJSONNodes.links)
			.size([width,height])
			.charge(-10000)
			.linkDistance(20)
			.on("tick", tick);

		var drag = force.drag()
		    .on("dragstart", function() {
		    	d3.event.sourceEvent.stopPropagation();
		    });

		var node = svg.select('.nodes').selectAll('.node');
		var link = svg.select('.links').selectAll('.link');

		this.createGraph = () => {

			link = link.data(this.realJSONNodes.links);

			link.enter()
				.append('g')
				.attr('class','link')
				.each(function(d) {
					d3.select(this).insert("line", ".node")
				});
			link.exit().remove();

			node = node.data(this.realJSONNodes.nodes);

			node.enter()
				.append('g')
				.attr('class', 'node')
				.attr('id', (d) => {
					return d._id;
				})
				.on("click", messageClicked)
				.each(function(d) {
					d3.select(this).append("rect")
						.attr('rx',5)
						.attr('ry',5)
						.style("transform", function(d) { return 'translate(-' + d.width/ 2 + 'px,-'+radius(d.size)/2+'px)';})
						.attr("width", function(d) { return d.width; })
						.attr("height", function(d) { return radius(d.size); })

					d3.select(this).append("text")
					   .attr("dy", ".35em")
					   .attr("text-anchor", "middle")
					   .text(function(d) { return d.text; });
				});
			node.exit().remove();

			force.start();
		}

		function addMessage(e) {
			var newMessage = {"text": "C", "size": 12, x: e.x, y: e.y};
			this.realJSONNodes.nodes.push(newMessage);
			this.realJSONNodes.links.push({source: newMessage, target: e.index});
			createGraph();
		}

		function zoomed() {
		  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
		}
	},
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
});

export default MainView;