import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createLogicMiddleware } from "redux-logic";
import { createStore, applyMiddleware, compose } from "redux";
import App from './App';
// import reportWebVitals from './reportWebVitals';
import ConfigProvider from "./ConfigProvider";
// import './index.css';
import 'react-notifications/lib/notifications.css';
import reducers from "./reducers";
import services from "./services";

// Create redux-logic middleware
const logicMiddleware = createLogicMiddleware(services, {});

// Middlewares: applyMiddleware() tells createStore() how to handle middleware
const middleware = applyMiddleware(logicMiddleware);

// Create enhancer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(middleware);

// Create store
let store = createStore(reducers, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider>
      <App/>
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

// ReactDOM.render(<ConfigProvider><App/></ConfigProvider>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
