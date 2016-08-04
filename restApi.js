function HttpRequest(type, url, content, callback){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			callback(JSON.parse(request.responseText));
		}
	};
	request.open(type, url, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(content));	
}

var serverRequests = {
	addTodo: function(id, text, callback){
		var content = {
			text: text,
			completed: false,
			id: id 
		};

		HttpRequest('POST', '/api/todos', content, callback);
	},
	deleteTodo: function(id){
		HttpRequest('POST', '/api/delete_todo/' + id, {}, function(responseText){
			
		});
	},
	updateCompleteStatus: function(id){
		HttpRequest('PUT', '/api/todos/' + id, {}, function(responseText){
			
		});
	}

};

export default serverRequests