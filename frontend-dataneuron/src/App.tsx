import './App.css'
import { Data } from './components/Data'
import SplitPane from 'react-split-pane';


const _SplitPane: any = SplitPane;

function App() {
  return <div className='rounded my-4 mx-4'>
        <_SplitPane  split="horizontal" minSize={50} maxSize={300} defaultSize={100}>
    
            <_SplitPane split="vertical" minSize={50} maxSize={300} defaultSize={50}>
                <Data type='admin'/>
                <Data type='employee'/>
            </_SplitPane>
            <Data type='customer'/>
          </_SplitPane>
    </div>
}

export default App
