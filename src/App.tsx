import React from 'react';
import './App.css';
const App = (props: { tab: string }) => {
  return (
    <div>
      <h1 className="heading__one">React application!!! yo1 {props.tab}</h1>
    </div>
  );
};

export default App;
