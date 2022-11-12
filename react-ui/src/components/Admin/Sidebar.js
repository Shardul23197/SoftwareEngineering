import React from 'react'
import '../../App.css'; 
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    
    <div>
      <div class="sidebar">
    <div class="logo-details">
      <i class='bx bxl-c-plus-plus'></i>
      <span class="logo_name">Fitocity</span>
    </div>
      <ul class="nav-links">
      <li>
          <Link to="/admindash">
            <i class='bx bx-grid-alt' ></i>
            <span class="links_name">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/showusers">
            <i class='bx bx-grid-alt' ></i>
            <span class="links_name">Show Users</span>
          </Link>
        </li>
        <li>
          <Link to="/showtrainers">
            <i class='bx bx-box' ></i>
            <span class="links_name">Show Trainers</span>
          </Link>
        </li>
        <li>
          <Link to="/approvetrainers">
            <i class='bx bx-list-ul' ></i>
            <span class="links_name">Approve Trainers</span>
          </Link>
        </li> 
        <li>
          <Link to="/showvideos">
            <i class='bx bx-list-ul' ></i>
            <span class="links_name">Workout Videos</span>
          </Link>
        </li> 
        <li>
          <Link to="/recipes">
            <i class='bx bx-list-ul' ></i>
            <span class="links_name">Recipes</span>
          </Link>
        </li>     
        <li>
          <Link to="/adminchat">
            <i class='bx bx-message' ></i>
            <span class="links_name">Messages</span>
          </Link>
        </li>
        <li>
          <Link to="/adminprofile">
            <i class='bx bx-coin-stack' ></i>
            <span class="links_name" >Profile</span>
          </Link>
        </li>
        <li>
          <Link to="#">
            <i class='bx bx-cog' ></i>
            <span class="links_name">Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/homepage">
            <i class='bx bx-log-out'></i>
            <span class="links_name" >Log out</span>
          </Link>
        </li>
      </ul>
  </div>
    </div>
  )
}
