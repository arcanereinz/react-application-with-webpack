import React from 'react';
import 'src/App.css';
import 'src/sample.scss';
import { Comp } from 'src/Comp';

const App = (props: { tab: string }) => {
  return (
    <div>
      <button>sample</button>
      <h1 className="heading__one">React application!!! {props.tab}</h1>
      <p>hello</p>
      <Comp />
    </div>
  );
};

export default App;
