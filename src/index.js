import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import Sidebar from './Components/Sidebar';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import reducers from './Store/reducers';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"



// const user = useSelector((state) => state.account.user);

export const folderStore = createStore(
    reducers,
    {},
    applyMiddleware(thunk)
)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={folderStore}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
