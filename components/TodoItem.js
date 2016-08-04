import React, { Component } from 'react'

class TodoItem extends Component {

	handleDelete(event){
		this.props.actions.deleteTodo(this.props.item.id);
	}

	handleComplete(event){
		console.log(this);
		this.props.actions.completeTodo(this.props.item);
	}

	render(){
		let style = (this.props.item.completed) ? this.props.styles.complete : this.props.styles.unComplete;
		return (
			<div style={style}>
				<li>
					<div>{this.props.item.text}</div>
					<button onClick={this.handleComplete.bind(this)}>Mark as Completed</button>
					<button onClick={this.handleDelete.bind(this)}>Delete</button>
				</li>
			</div>
		);
	}

}

export default TodoItem