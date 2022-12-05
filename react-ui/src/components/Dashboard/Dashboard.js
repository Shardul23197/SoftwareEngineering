import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useSearchParams } from "react-router-dom";
import '../../App.css'; 
import Alert from 'react-bootstrap/Alert';
import Pagination from '../Pagination';
import { Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles'
import axios from 'axios'
import { useAuth } from '../auth/auth'
import {useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import {getWorkoutsBySearch} from '../../actions/workouts'
import { useDispatch } from 'react-redux';
import store from '../../state/store'
import './Dashboard.css'
import Navigation from '../Navigation/Navigation';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBBtn,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";






export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const page=searchParams.get('page')||1;
  const searchQuery=searchParams.get('searchQuery');
  const classes = useStyles();
  const [search,setSearch]=useState('');
  const [tags,setTags]=useState([]);
  const navigate = useNavigate();
  const selector = useSelector(state => state)
  const [data, setData] = useState(selector.email)
  const [roleFromState, setRoleFromState] = useState(selector.role)
  const [role, setRole] = useState('')
  const authToken = localStorage.getItem('authToken');

  const searchWorkout=()=>{
    if(search.trim()){
      //dispatch->fetch workout
      dispatch(getWorkoutsBySearch({ search, tags: tags.join(',') }));
    }
    else{
      navigate('/');
    }
  }

  const handleKeyPress=(e)=>{
    if(e.keyCode===13){
      //search workout
      searchWorkout();
    }
  };

  const handleAdd=(tag)=>setTags([... tags, tag]);

  const handleDelete=(tagtoDelete)=>setTags(tags.filter((tag)=>tag!=tagtoDelete));

  const getRole = () => {
    setData(selector.email)
    axios.get('http://localhost:5000/api/users/getrole', { params: { email: data } })
    .then((res) => {
      store.dispatch({type: 'SET_ROLE', payload: res.data.role}) 
      setRole(res.data.role)      
    })
    .catch((error) => {
      if (error.response)
        console.log(error.response.data);
    })
  }

  useEffect(() => {
    getRole();
  }, []);

  const schedulerData = [
    {
      Id: 1,
      Subject: 'Meeting - 1',
      StartTime: new Date(2018, 1, 15, 10, 0),
      EndTime: new Date(2018, 1, 16, 12, 30),
      IsAllDay: false
    }
      ];
  return (
    <>

<Navigation/>
<ToastContainer/>


<section class="home-section" style={{backgroundColor:'#cbe2f7'}}>
  <nav>
    <div class="sidebar-button">
      <i class='bx bx-menu sidebarBtn'></i>
      <span class="dashboard">Dashboard</span>
    </div>
  </nav>


      <div className="gradient-custom-2" style={{ backgroundColor: "#cbe2f7", minHeight:'100vh', marginTop:'100px'}}>
        
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol className="subsection">
              {/* User Profile Card */}
              <MDBCard>
                {/* User information card */}
                <MDBCardBody className="text-black p-4">
                  <MDBRow
                    className="justify-content-left align-items-center"
                    md="6"
                    style={{ marginBottom: "30px" }}
                  >
                    <h1 className="fw-bold" style={{ width: "600px" }}>
                      Your Agenda
                    </h1>
                  </MDBRow>
                  <MDBRow
                    md="4"
                    className="justify-content-center align-items-center h-100"
                  >
                    <div>
                      <table
                        class="table table-bordered"
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Description</th>
                            <th scope="col">Meeting Link</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>10.12.2022</td>
                            <td>10:00am</td>
                            <td>30 minutes</td>
                            <td>This is an introductory class</td>
                            <td>https://zoom.com</td>
                            <td>
                              <button type="button" class="btn btn-danger">
                                Cancel
                              </button>
                            </td>
                          </tr>
                 
                        </tbody>
                      </table>
                    </div>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
     
      </div>
</section>
    </>
  )

}
