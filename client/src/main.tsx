import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter as Router} from "react-router-dom"
import ErrorBoundary from "./Error.Boundary";
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Provider store ={store}>
    <ErrorBoundary>
     <App/>
    </ErrorBoundary>
    </Provider>
  </Router>
);
