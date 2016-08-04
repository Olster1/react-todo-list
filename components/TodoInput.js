import React, { Component } from 'react'

class TodoInput extends Component {

	constructor(props){
		super(props);
		this.state = {
			text: "",
		};
	}

	handleChange(event){
		this.setState({text: event.target.value});
	}

	handleSubmit(event){
		event.preventDefault();
		
		this.props.actions.addTodo(this.state.text, this.props.user.id, this.props.todos);
		this.setState({text: ""});


	}

	render(){
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input 
					placeholder="Type your todo"
					value={this.state.text} 
					onChange={this.handleChange.bind(this)} />
					<input type="submit" text="Submit"/>
				</form>
			</div>
		);
	}

}

export default TodoInput