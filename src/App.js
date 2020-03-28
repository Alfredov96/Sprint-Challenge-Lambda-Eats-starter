import React from "react";
import "./App.css"
import { Route } from 'react-router-dom';
import Form from './components/Form';
import Home from './components/Home';

   function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/pizza">
      <Form />
      </Route>
      
    </div> 
  );
}
export default App;
