import './App.css'
import { Data } from './components/Data'
import SplitPane from 'react-split-pane';
import { useState } from 'react';

function App() {
  return <SplitPane split="horizontal" minSize={50} maxSize={300} defaultSize={100}>
    
    <SplitPane split="vertical" minSize={50} maxSize={300} defaultSize={100}>
        <Data type='admin'/>
        <Data type='employee'/>
    </SplitPane>
    <Data type='customer'/>
  </SplitPane>
}

export default App
