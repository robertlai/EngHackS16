import React from 'react';
import test from '../test';
import Message from 'components/message';
import InputBox from 'components/inputBox';
import d3 from 'd3';
import jquery from 'jquery';
import io from 'socket.io-client';
import {getUser} from 'core/utils';

const MainView = React.createClass({
	socket: io(),
	componentDidMount() {
		console.log(this.socket);
		this.socket.on('setGroupId', (groupId) => {
			console.log('OK');
		});
		this.socket.on('notAllowed', () => {
			console.log('NOT OK');
		});
		getUser().then((json) => {
			this.socket.emit('conversationConnect', json.user);
		});

		// d3 stuff
		var color = d3.scale.category20();
		var radius = d3.scale.sqrt().range([10, 20]);

		var zoom = d3.behavior.zoom()
		    .scaleExtent([1, 3])
		    .on("zoom", zoomed);

		var fakeJSONfile = {};
		  fakeJSONfile.nodes = [
		    {"atom": "Hi I am Calvin!! I am going to fail 213Hi I am Calvin!! I am going to fail 213Hi I am Calvin!! I am going to fail 213Hi I am Calvin!! I am going to fail 213Hi I am Calvin!! I am going to fail 213Hi I am Calvin!! I am going to fail 213Hi I am Calvin!! I am going to fail 213Hi I am Calvin!! I am going to fail 213", "size": 12},
		    {"atom": "C", "size": 12},
		    {"atom": "C", "size": 12},
		    {"atom": "N", "size": 14},
		  ];
		  fakeJSONfile.links = [{"source": 0, "target": 1},
		    {"source": 1, "target": 2},
		    {"source": 1, "target": 3},
		    {"source": 2, "target": 3}
		]

		var width = window.innerWidth;
		var height = window.innerHeight;

		var svg = d3.select('#root-message-anchor')
					.append('svg')
					.attr("width",width)
					.attr("height",height)
					.call(zoom)
					.append('g');

		var tick = function() {
			link.selectAll("line")
	        .attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });

		    node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; });
		}

		var force = d3.layout.force()
			.nodes(fakeJSONfile.nodes)
			.links(fakeJSONfile.links)
			.size([width,height])
			.charge(-10000)
			.linkDistance(50)
			.on("tick", tick);

		var link = svg.selectAll('.link').data(fakeJSONfile.links);

		link.enter()
			.append('g')
			.attr('class','link')
			.each(function(d) {
	  			d3.select(this).insert("line", ".node")
	  				.style("stroke-width", "3px");

	  		});
		link.exit().remove();

		var node = svg.selectAll('.node').data(fakeJSONfile.nodes);

		node.enter()
			.append('g')
			.attr('class','node')
			.each(function(d) {
				d3.select(this).append("rect")
					.attr('rx',5)
					.attr('ry',5)
					.style("transform", function(d) { return 'translate(-' + radius(d.size) / 2 + 'px)';})
					.attr("width", function(d) { return radius(d.size); })
					.attr("height", function(d) { return radius(d.size); })
					.style("fill", function(d) { return color(d.atom); });
			});
		node.exit().remove();

		force.start();

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