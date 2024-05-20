import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route,createBrowserRouter, createRoutesFromElements }from 'react-router-dom'
import { Provider } from 'react-redux';
import { store, persistor } from '../src/store/persistConfig.js';
import { PersistGate } from 'redux-persist/integration/react';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from '../src/store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
