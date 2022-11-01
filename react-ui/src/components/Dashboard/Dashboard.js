import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link, useLocation } from "react-router-dom";
import '../../App.css'; 
import Alert from 'react-bootstrap/Alert';
import Pagination from '../Pagination';
import { Paper, AppBar, TextField, Button,Container, Grow, Grid } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles'
import axios from 'axios'
import { useAuth } from '../auth/auth'
import { useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import {getUsersBySearch} from '../../state/actions/users'
import { useDispatch } from 'react-redux';
import Users from '../Users/Users';


function useQuery(){
  return new URLSearchParams(useLocation().search);
}


export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const page=searchParams.get('page')||1;
  const searchQuery=searchParams.get('searchQuery');
  const classes = useStyles();
  const [search,setSearch]=useState('');
  const [tags,setTags]=useState([]);
  const navigate = useNavigate();
  const selector = useSelector(state => state.email)
  const [data, setData] = useState(selector)
  const [role, setRole] = useState('')

  // Auth token and refresh token state
  const existingAuthtoken = localStorage.getItem('authToken') || '';
  const [authToken, setAuthtoken] = useState(existingAuthtoken);
  const [currentId, setCurrentId] = useState(0);

  
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  


  const searchUser=()=>{
    if(search.trim()||tags){
      //dispatch->fetch workout
      dispatch(getUsersBySearch({ search, tags: tags.join(',') }));
      navigate(`/dashboard/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    }
    else{
      navigate('/');
    }
  }

  const handleKeyPress=(e)=>{
    if(e.keyCode==13){
      //search workout
      searchUser();
    }
  };

  // const handleKeyPress=(e)=>{
  //   if(e.keyCode===13){
  //     //search workout
  //     searchWorkout();
  //   }
  // };

  const handleAdd=(tag)=>setTags([... tags, tag]);

  const handleDelete=(tagtoDelete)=>setTags(tags.filter((tag)=>tag!=tagtoDelete));

  useEffect(() => {
    setData(selector)
    axios.get('http://localhost:5000/api/users/getrole', { params: { email: data } })
      .then((res) => {
        setRole(res.data.role)
      })
      .catch((error) => {
        if (error.response)
          console.log(error.response.data);
      })
  }, [selector, role, navigate, data]);

  const navigateToProfile = () => {
    navigate('/profile')
  };

  /* When the user clicks log out, send post to {backend base url}/auth/logout
   * and remove authToken and refreshToken from local storage.
   */
  const onLogout = (event) => {
      const headers = {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      };
      const instance = axios.create({
          baseURL: 'http://localhost:5000',
          withCredentials: true,
          headers: headers
      });
      
      instance.post('/auth/logout', {}).then((res) => {
          // set token in local storage to the returned jwt
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          
          // Redirect to the dashboard because the user is logged in
          navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <>
<div class="sidebar">
    <div class="logo-details">
      <i class='bx bxl-c-plus-plus'></i>
      <span class="logo_name">Fitocity</span>
    </div>
      <ul class="nav-links">
        <li>
          <a href="#" class="active">
            <i class='bx bx-grid-alt' ></i>
            <span class="links_name">Explore</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class='bx bx-box' ></i>
            <span class="links_name">Workout</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class='bx bx-list-ul' ></i>
            <span class="links_name">Diet</span>
          </a>
        </li>      
        <li>
          <a href="#">
            <i class='bx bx-message' ></i>
            <span class="links_name">Messages</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class='bx bx-heart' ></i>
            <span class="links_name">Favorites</span>
          </a>
        </li>
        <li>
          <Link to="/profile">
            <i class='bx bx-coin-stack' ></i>
            <span class="links_name">Profile</span>
          </Link>
        </li>
        <li>
          <a href="#">
            <i class='bx bx-cog' ></i>
            <span class="links_name">Settings</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class='bx bx-log-out'></i>
            <button class="links_name" onClick={onLogout}>Log out</button>
          </a>
        </li>
      </ul>
  </div>
  <section class="home-section">
    <nav>
      <div class="sidebar-button">
        <i class='bx bx-menu sidebarBtn'></i>
        <span class="dashboard">Dashboard</span>
      </div>
      <AppBar className={classes.appBarSearch} position="static" color="inherit">
        <TextField
        name="search"
        label="Search users"
        onKeyPress={handleKeyPress}
        onChange={(e)=>setSearch(e.target.value)}
        />
        <Button onClick={searchUser} className={classes.searchButton} color="primary" variant="contained">Search</Button>

      </AppBar>
      <div class="profile-details">
        <img src="https://xsgames.co/randomusers/assets/avatars/male/63.jpg" alt=""/>
        <span class="admin_name">Welcome User</span>
        <i class='bx bx-chevron-down' ></i>
      </div>
    </nav>
    {/* <Container maxWidth="xl">
      <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
        <Grid item xs={9} sm={3} md={6}>
          <Users/>
        </Grid>
      </Grid>
    </Container> */}
    <div className="main">
      <h1>React Search</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <Users input={inputText} />
    </div>
    
    
  </section>

  <Paper elevation={6}>
    <Pagination page={page}/>
  </Paper>


    </>
  )

}
