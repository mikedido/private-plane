
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Scheduler from "./pages/scheduler/Scheduler";
import Home from './pages/home/Home';
import AppLayout from './components/layout/AppLayout';
import AppLayout2 from './components/layout/AppLayout2';

import './App.css'


function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/scheduler" element={<Scheduler />}></Route>
          </Route>
          <Route element={<AppLayout2 />}>
            <Route path="/home2" element={<Home />}></Route>
            <Route path="/scheduler2" element={<Scheduler />}></Route>
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
