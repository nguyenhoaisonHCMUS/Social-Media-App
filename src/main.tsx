import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './Global.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null} />
            <App />
        </Provider>
    </BrowserRouter>,
);
