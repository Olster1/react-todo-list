import React, { Component } from 'react'

class UserInfo extends Component {
	constructor(props){
		super(props);
		this.state = {
			text: ""
		};
	}

	handleChange(event){
		this.setState({text: event.target.value});
	}

	attemptLogin(){
		this.props.actions.attemptLogin(this.state.text);
	}
	
	render(){

		return (
			<div>
				<div>{this.props.user.name}</div>
				<input onChange={this.handleChange.bind(this)}/>
				<button onClick={this.attemptLogin.bind(this)}> Login </button>
			</div>
		);
	}

}

export default UserInfo