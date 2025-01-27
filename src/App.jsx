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
import Agent from './Component/Agent&Blog/Agent'
import HomeShift from './Component/Home_Shift/HomeShift'
import HomeInterior from './Component/HomeInterior/HomeInterior';
import HomeLoan from './Component/Home_Loan/HomeLoan';
import Commercial from './Component/Commercial/Commercial'
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
      <Route path='/article' element={<Agent/>}></Route>
      <Route path="/HomeShift" element={<HomeShift/>}></Route>
      <Route path="/HomeInterior" element={<HomeInterior />} />
      <Route path="/HomeLoan" element={<HomeLoan/>}></Route>
      <Route path="/Commercial" element={<Commercial/>}></Route>   
      </Routes>
    </Router>
   {/* <AdminAccesor/>  */}
   {/* <Property/> */}
   {/* <PropertyEditForm/> */}
    </>
  )
}

export default App
