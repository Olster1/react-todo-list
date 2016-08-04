import React, { Component } from 'react'
import TodoItem from './TodoItem'

class TodoList extends Component {

	render(){
		return (
			<div>
				<ul>
					{
						this.props.list.map((item) => {
							return <TodoItem actions={this.props.actions} styles={this.props.styles} key={item.id} item={item}/>
						})
					}
				</ul>
			</div>
		);
	}

}

export default TodoList