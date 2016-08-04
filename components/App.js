import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import UserInfo from './UserInfo'
import { connect } from 'react-redux'
import actions from '../redux/actions'
import { bindActionCreators } from 'redux'

class App extends Component{
	render(){

		return (
			<div>
				<UserInfo styles={this.props.styles} user={this.props.userInfo.user} actions={this.props.actions}/>
				<div style={this.props.userInfo.style}>
					<h1 style={this.props.styles.todoHeader}>Todo List</h1>
					<TodoInput actions={this.props.actions} todos={this.props.todos} user={this.props.userInfo.user}/>
					<TodoList list={this.props.todos} styles={this.props.styles.todoItem} actions={this.props.actions}/>
				</div>
			</div>
			);
	}

}

function mapStateToProps(state){
	return state;
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
