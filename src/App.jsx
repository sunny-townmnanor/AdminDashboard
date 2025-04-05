import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminAccesor from './Component/AdminAccesor'
import Property from './Component/PropertyTable/PropertyTable'
import PropertyEditForm from './Component/PropertyTable/PropertyEditForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InquireMain from './Component/Inquirelead/InquireMain'
import HomeInsurance from './Component/Inquirelead/HomeInsurance'
import User from './Component/UserAgent/User'
import Agent from './Component/Agent&Blog/Agent'
import HomeShift from './Component/Home_Shift/HomeShift'
import HomeInterior from './Component/HomeInterior/HomeInterior';
import HomeLoan from './Component/Home_Loan/HomeLoan';
import Commercial from './Component/Commercial/Commercial'
import AgentLogin from './Component/Agent&Blog/AgentLogin'
import BlockAgent from './Component/Agent&Blog/BlockAgent'
import Articleblog from './Component/Agent&Blog/Articleblog'
import CommTabel from './Component/Commercial/CommTabel'
import Editpage from './Component/Commercial/Editpage'
import UploadBlog from './Component/Agent&Blog/UploadBlog'
import Customer from './Component/Customer Feedback/Customer'
import PaymentPlan from './Component/Commercial/PaymentPlan'
import PaymentPlanEdit from './Component/Commercial/PaymentPlanEdit'
import AgentFeature from './Component/Agent_ feature/Agent_feature'
import Subscription from './Component/Payment&Subscription/Subscription'
import UserEditpage from './Component/Commercial/User/UserEditpage'
import Advertisment from './Component/Advertisment/Advertisment'
import HomePageAdv from './Component/Advertisment/HomePageAdv'
import PropertyControl from './Component/PropertyTable/PropertyControl'
import MainProperty from './Component/PropertyTable/MainProperty'
import PropTechNews from './Component/Agent&Blog/PropTechNews'
import ArticleComponent from './Component/Agent&Blog/ArticleComponent'
import MainBlog from './Component/Agent&Blog/MainBlog'
import News from './Component/Agent&Blog/News'
import UploadArticle from './Component/Agent&Blog/UploadArticle'
import PropertyEditFormEnhanced from './Component/PropertyTable/PropertyEditFormEnhanced'
function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainProperty />}></Route>
                   <Route path="/ownerproperty" element={<Property />}></Route>
          <Route path="/editform/:index" element={<PropertyEditForm />}></Route>
          <Route path="/Inquire" element={<InquireMain />}></Route>
          <Route path="/HomeInsurance" element={<HomeInsurance />}></Route>
          <Route path="/UserAgent" element={<User />}></Route>
          <Route path='/article' element={<Agent />}></Route>
          <Route path="/HomeShift" element={<HomeShift />}></Route>
          <Route path="/HomeInterior" element={<HomeInterior />} />
          <Route path="/HomeLoan" element={<HomeLoan />}></Route>
          <Route path="/Commercial" element={<Commercial />}></Route>
          <Route path="/commercialdashboard" element={<CommTabel />}></Route>
          <Route path="/edit/:id" element={<Editpage />}></Route>
          <Route path="/agentLogin" element={<AgentLogin />} />
          <Route path="/blockAgent" element={<BlockAgent />} />
          <Route path="/blockArtica/:index" element={<Articleblog />} />
          <Route path="/uploadblog" element={<UploadBlog />} />
          <Route path="/customer" element={<Customer/>}/>
          <Route path="/paymentPlan/:id" element={<PaymentPlan/>}/>
          <Route path="/paymentPlanEdit/:id/:id" element={<PaymentPlanEdit/>}/>
          <Route path="/agentfeature" element={<AgentFeature/>}/>
          <Route path='/Subscription' element={<Subscription/>}/>
          <Route path='/useredit/:id' element={<UserEditpage/>}/>
               <Route path='/proptech' element={<PropTechNews/>}/>
                    <Route path='/singleblog/:id' element={<ArticleComponent/>}/>
                    <Route path='/postcontrol' element={<MainBlog/>}/>
                    <Route path='/news' element={<News/>}/>
                       <Route path="/advertisment" element={<Advertisment/>}/>
                              <Route path="/propertycontrol" element={<PropertyControl/>}/>
                              <Route path="/homeadvertisment" element={<HomePageAdv/>}/>
                                <Route path="/uploadarticle" element={<UploadArticle />} />
                                <Route path="/editform2/:id" element={<PropertyEditFormEnhanced />} />
        </Routes> 
      </Router>
      {/* <AdminAccesor/>  */}
      {/* <Property/> */}
      {/* <PropertyEditForm/> */}
    </>
  )
}

export default App
