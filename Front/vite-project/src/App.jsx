import React from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Create from "./Create";
import Read from "./Read";
import Update from "./Update";
import Create_Foto from "./Create_Foto";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />}/>
        <Route path="/read/:id" element={<Read />}/>
        <Route path="/edit/:id" element={<Update />}/>
        <Route path="/create_foto/:id" element={<Create_Foto />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
