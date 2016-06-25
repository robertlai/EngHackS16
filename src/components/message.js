import React from 'react';
import _ from 'lodash';

const Message = React.createClass({
	render() {
		var degree = ((this.props.selfAngle || 0) + 340 * (this.props.index || 0) / (this.props.nodeCount || 1)) % 360;
		return (
			<div className='messageContainer'>
				<div className='message' style={{'left':Math.sin(degree)*100+'px','bottom':Math.cos(degree)*100+'px'}}>
					{ this.props.text }
				</div>
				<div className='children'>
					{ _.map(this.props.children, (message, i) => {
						return <Message {...message} selfAngle={degree} nodeCount={this.props.children.length + 1} index={i+1}/>;
					}) }
				</div>
			</div>
		);
	}
});

export default Message;