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
	componentDidMount() {
		socket.on('receivedChildren', (node) => {
			node._children.forEach((child) => {
				this.realJSONNodes.nodes.push({
					"_id": child._id,
					"atom": child.content,
					"size": 12,
					"x": 0,
					"y": 0,
				});
				this.realJSONNodes.links.push({
					"source": _.findIndex(this.realJSONNodes.nodes, (lookingAt) => {
						return lookingAt._id == node._id;
					}),
					"target": _.findIndex(this.realJSONNodes.nodes, (lookingAt) => {
						return lookingAt._id == child._id;
					}),
				});
				this.createGraph();
				socket.emit('getChildren', child._id);
			});
		});
		socket.on('setGroupId', (groupId) => {
			console.log('OK');
			this.realJSONNodes.nodes.push({
				"_id": "576f60e8266ba3c40ab80788",
				"atom": "root node",
				"size": 12,
				"x": 0,
				"y": 0,
			});
			socket.emit('getChildren', '576f60e8266ba3c40ab80788');
		});
		socket.on('notAllowed', () => {
			console.log('NOT OK');
		});
		getUser().then((json) => {
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

		var messageClicked = function (message) {
			if (self.messageSelected) {
				self.messageSelected.classed('selectedNode', false);
			}
		 	self.messageSelected = d3.select(this).select("rect").classed('selectedNode', true);
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
			.linkDistance(50)
			.on("tick", tick);

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
				.attr('class','node')
				.on("click", messageClicked)
				.each(function(d) {
					d3.select(this).append("rect")
						.attr('rx',5)
						.attr('ry',5)
						.style("transform", function(d) { return 'translate(-' + radius(d.size) / 2 + 'px)';})
						.attr("width", function(d) { return radius(d.size)*5; })
						.attr("height", function(d) { return radius(d.size); })

					d3.select(this).append("text")
				       .attr("dy", ".35em")
				       .attr("text-anchor", "middle")
				       .text(function(d) { return d.atom; });
				});
			node.exit().remove();

			force.start();
		}

		// setInterval(createGraph, 300);

		function addMessage(e) {
			var newMessage = {"atom": "C", "size": 12, x: e.x, y: e.y};
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
				<InputBox />
				<div id='root-message-anchor'></div>
			</div>
		);
	}
});

export default MainView;