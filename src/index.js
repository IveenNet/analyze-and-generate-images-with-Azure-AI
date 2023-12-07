import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

require('dotenv').config();
console.log(process.env.REACT_APP_OPENAI_API_KEY);

ReactDOM.render(<App />, document.getElementById('root'));
