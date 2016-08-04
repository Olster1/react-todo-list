function getId(todos){
	return todos.reduce((maxId, todo) => {
		return Math.max(todo.id, maxId)
	}, -1) + 1
}
function todoReducer(todos, action){
	switch(action.type){
		case 'ADD_TODO': {
			return  [...todos, action.item]
			}
		case 'POPULATE_TODOS': {
			return  action.data;
		}
		case 'DELETE_TODO':{
			return todos.filter((todo) => {
				return (todo.id !== action.id);
			});
		}
		case 'COMPLETE_TODO':{
			return todos.map((todo) => {
					return ((todo.id === action.todoItem.id) ? 
						action.todoItem : todo);
				})
		}
		default:
		return todos;
	}
}

function userReducer(userInfo, action){
	switch(action.type){
		case 'UPDATE_LOGIN_DETAILS':{
			return {
				user: action.userDetails,
				isLoggedIn: !userInfo.isLoggedIn,
				style: {display: "block"}

			};
		}
		default:
		return userInfo;
	}
}

export default function rootReducer(state, action){
	var newState = {};

	newState.todos = todoReducer(state.todos, action);
	newState.userInfo = userReducer(state.userInfo, action);

	newState.styles = state.styles;
	
	return newState;
}