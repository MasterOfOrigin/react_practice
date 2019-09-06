import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Root } from './components/Root.js';

function App() {
  return (
    <div className="App">
      <Router >
          <Route path="/" component={Root} />
      </Router>
    </div>
  );
}

export default App;
