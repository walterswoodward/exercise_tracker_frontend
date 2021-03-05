import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Reducer from './reducers'
import logger from 'redux-logger';
import './assets/main.css'

import App from './App'

// const store = createStore(Reducer, applyMiddleware(thunk));

// Redux DevTools (https://github.com/zalmoxisus/redux-devtools-extension)
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);
const store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk, logger)));

// Remove console log in production mode
if (process.env.NODE_ENV === "production") {
    console.log = function(){}; 
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
