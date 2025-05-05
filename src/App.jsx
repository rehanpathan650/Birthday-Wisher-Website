import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './Components/Home';
import CustomCard from './Components/CustomCard';

function App() {
   
    return <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/custom' element={<CustomCard />} />
          </Routes>
    </BrowserRouter>
}

export default App
