import React from 'react' //ES6 syntax 
import { render } from 'react-dom' //ES6 syntax 
import App from '../components/App' //ES6 syntax 
import styles from '../components/styles' //ES6 syntax 
import configureStore from '../redux/store'
import { Provider } from 'react-redux'
import actions from '../redux/actions'

let initialState = {
	todos: [],
	userInfo: {
		user: {},
		isLoggedIn: false,
		style: {display: "none"}
	},
	styles: styles
};

let store = configureStore(initialState);

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('app')
);