import React from 'react'
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import ShowUsers from './ShowUsers';
import ShowTrainers from './ShowTrainers';
import ApproveTrainers from './ApproveTrainers';
import { BrowserRouter, Switch, Route,Routes } from "react-router-dom";
import AdminChat from './AdminChat';
import AdminDash from './AdminDash';
import Adminprofile from './Adminprofile';
import ShowVideos from './ShowVideos';

export default function Admin() {
  
    
    return (
    //   <React.Fragment>
    //   <Sidebar />
    //   <div className="wrapper d-flex flex-column min-vh-100 bg-light">
    //     <AdminHeader />

    //     <div className="body flex-grow-1 px-3"> 

    //   <BrowserRouter>
    //     <Switch>
    //       <Route component={ShowUsers} path="/showusers" exact />
    //       <Route component={ShowTrainers} path="/showtrainers" />
    //       <Route component={ApproveTrainers} path="/approvetrainers" />
    //     </Switch>
    //   </BrowserRouter>


    //       <AdminContent />
    //       <ShowUsers></ShowUsers>
    //       <ApproveTrainers></ApproveTrainers>
    //     </div>
      
    // </React.Fragment>

<BrowserRouter>

<Sidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <Routes>

        <Route path='/admindash' element={
            <AdminDash></AdminDash>
            }/>
        <Route path='/showtrainers' element={
            <ShowTrainers></ShowTrainers>
            }/>
        
        <Route path='/showusers' element={
            <ShowUsers></ShowUsers>
            }/>

        <Route path='/approvetrainers' element={
            <ApproveTrainers></ApproveTrainers>
            }/>

<       Route path='/adminchat' element={
            <AdminChat></AdminChat>
            }/>

<Route path='/adminprofile' element={
            <Adminprofile></Adminprofile>
            }/>

<Route path='/showvideos' element={
            <ShowVideos></ShowVideos>
            }/>



     
            
        </Routes>
        </div>
    </BrowserRouter>
  )
}

