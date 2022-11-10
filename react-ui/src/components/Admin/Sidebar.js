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
          <a href="/admindash" class="active">
            <i class='bx bx-grid-alt' ></i>
            <span class="links_name">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="showusers">
            <i class='bx bx-grid-alt' ></i>
            <span class="links_name">Show Users</span>
          </a>
        </li>
        <li>
          <a href="/showtrainers">
            <i class='bx bx-box' ></i>
            <span class="links_name">Show Trainers</span>
          </a>
        </li>
        <li>
          <a href="/approvetrainers">
            <i class='bx bx-list-ul' ></i>
            <span class="links_name">Approve Trainers</span>
          </a>
        </li> 
        <li>
          <a href="/workout">
            <i class='bx bx-list-ul' ></i>
            <span class="links_name">Workout Videos</span>
          </a>
        </li> 
        <li>
          <a href="/recipes">
            <i class='bx bx-list-ul' ></i>
            <span class="links_name">Recipes</span>
          </a>
        </li>     
        <li>
          <a href="/adminchat">
            <i class='bx bx-message' ></i>
            <span class="links_name">Messages</span>
          </a>
        </li>
        <li>
          <a href="/adminprofile">
            <i class='bx bx-coin-stack' ></i>
            <span class="links_name" >Profile</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class='bx bx-cog' ></i>
            <span class="links_name">Settings</span>
          </a>
        </li>
        <li>
          <a href="/homepage">
            <i class='bx bx-log-out'></i>
            <span class="links_name" >Log out</span>
          </a>
        </li>
      </ul>
  </div>
    </div>
  )
}
