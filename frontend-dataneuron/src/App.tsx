import './App.css'
import { Data } from './components/Data'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/resizable" ;



function App() {
  
  return <div className="h-[89dvh] mx-4 my-4 content-around">
  <ResizablePanelGroup  direction="vertical" className='w-full h-full'>
    <ResizablePanel defaultSize={40}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30}>
          <div className="flex justify-center items-center p-4 border overflow-auto lg:pt-10 p-4 ps-4 overflow-auto">
            <Data type='admin' />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <div className="flex justify-center items-center p-4 border h-full overflow-auto no-scrollbar ps-28 lg:ps-0">
            <Data type='employee' />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>

    <ResizableHandle withHandle />
    <ResizablePanel defaultSize={50}>
      <div className="flex justify-center items-start p-4 border overflow-auto no-scrollbar lg:pt-10 p-4 ps-4 lg:ps-0">
        <Data type='customer' />
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</div>
}

export default App
