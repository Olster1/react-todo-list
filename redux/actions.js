import serverRequests from '../restApi'



function getId(todos){
	return todos.reduce((maxId, todo) => {
		return Math.max(todo.id, maxId)
	}, -1) + 1
}

function populateTodos(userId, dispatch){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			let todosSeed = request.responseText;
			let action = { 
				type: 'POPULATE_TODOS',
				data: JSON.parse(todosSeed)
			};
			
			dispatch(action);
		}
	};

	request.open('GET', '/api/Todos/' + userId, true);
	request.send();
}

function getTodo(id, todos){
		var result = null;
		for(var i = 0; i < todos.length; ++i){
			if(todos[i].id === id){
				result = todos[i];
				break;
			}
		}
		return result;
	}

let actions = {
	addTodo: function(text, userId, todos){
		var newId = getId(todos);

		var todoItem = {
			text: text, 
			completed: false,
			id: newId,
			user_id: userId
		};



		var request = new XMLHttpRequest();
		request.onreadystatechange = function(){
			if(request.readyState == 4 && request.status == 200){
				// dispatch(action);
			}
		};

		console.log(todoItem);
		request.open('POST', '/api/todos', true);
		request.setRequestHeader("Content-Type", "application/json");
		request.send(JSON.stringify(todoItem));	

		let action = { 
			type: 'ADD_TODO',
			item: todoItem
		};

		return action;
		
	},

	createNewUserId: function(){
		return{
			type: "CREATE_USER_ID",
			newId: Math.round(100*Math.random())
		};
	},

	attemptLogin: function(attemptUsername){
		return dispatch => {
			var request = new XMLHttpRequest();
			request.onreadystatechange = function(){
				if(request.readyState == 4 && request.status == 200){
					let resultedUserDetails = JSON.parse(request.responseText);
					if(resultedUserDetails.name && 
						resultedUserDetails.name === attemptUsername){
						let action = {
							type: "UPDATE_LOGIN_DETAILS",
							userDetails: resultedUserDetails
						};
						populateTodos(resultedUserDetails.id, dispatch);
						dispatch(action);	
					}
				}
			};
			request.open('GET', '/api/todos_login/' + attemptUsername, true);
			request.setRequestHeader("Content-Type", "application/json");
			request.send();	
		};
	},

	completeTodo: function(todoItem){
		let updatedTodo = Object.assign({}, todoItem, {completed: !todoItem.completed});
		var request = new XMLHttpRequest();
		request.onreadystatechange = function(){

			if(request.readyState == 4 && request.status == 200){
			}
		};
		request.open('POST', '/api/Todos/' + todoItem.id, true);
		request.setRequestHeader("Content-Type", "application/json");
		request.send(JSON.stringify(updatedTodo));	

		return {
			type: 'COMPLETE_TODO',
			todoItem: updatedTodo
		};
	},

	createNewUserIdIfOdd: function(){
		return (dispatch, getState) => {
			const state = getState();
			if(state.user.id % 2 === 0){
				return;
			}
			dispatch(actions.createNewUserId());
		}
	},

	deleteTodo: function(id){

		var request = new XMLHttpRequest();
		request.onreadystatechange = function(){

			if(request.readyState == 4 && request.status == 200){
			}
		};
		request.open('POST', '/api/delete_todo/' + id, true);
		request.setRequestHeader("Content-Type", "application/json");
		request.send();	

		return {
			type: 'DELETE_TODO',
			id: id 
		};
	}
}

export default actions