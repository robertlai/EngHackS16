import React from 'react';
import _ from 'lodash';

const Message = React.createClass({
	render() {
		var degree = (this.props.selfAngle + 2 * Math.PI * this.props.index / this.props.nodeCount) % (2 * Math.PI);
		return (
			<div className='messageContainer'
				style={{
					left: Math.sin(degree)*100 + 'px',
					bottom: Math.cos(degree)*100 + 'px'
				}}>
				<div
					className='message'

				>
					{ this.props.text }
				</div>
				<div className='children'>
					{ _.map(this.props.children, (message, i) => {
						return <Message {...message} selfAngle={degree + Math.PI} nodeCount={this.props.children.length + 1} index={i + 1}/>;
					}) }
				</div>
			</div>
		);
	}
});

export default Message;