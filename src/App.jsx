import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminAccesor from './Component/AdminAccesor'
import Property from './Component/PropertyTable/PropertyTable'
import PropertyEditForm from './Component/PropertyTable/PropertyEditForm'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import InquireMain from './Component/Inquirelead/InquireMain'
import HomeInsurance from './Component/Inquirelead/HomeInsurance'
import User from './Component/UserAgent/User'

function App() {
  

  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Property/>}></Route>
      <Route path="/editform/:index" element={<PropertyEditForm/>}></Route>
      <Route path="/Inquire" element={<InquireMain/>}></Route>
      <Route path="/HomeInsurance" element={<HomeInsurance/>}></Route>
      <Route path="/UserAgent" element={<User/>}></Route>
      </Routes>
    </Router>
   {/* <AdminAccesor/>  */}
   {/* <Property/> */}
   {/* <PropertyEditForm/> */}
    </>
  )
}

export default App
