import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useSearchParams } from "react-router-dom";
import '../../App.css'; 
import Alert from 'react-bootstrap/Alert';
import Pagination from '../Pagination';
import { Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles'
import axios from 'axios'
import qs from "qs";
import { useAuth } from '../auth/auth'
import {useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import {getWorkoutsBySearch} from '../../actions/workouts'
import { useDispatch } from 'react-redux';
import store from '../../state/store'
import './Dashboard.css'
import Navigation from '../Navigation/Navigation';
import Table from '../Table/Table';
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
  // const [searchParams, setSearchParams] = useSearchParams();
  // const dispatch = useDispatch();
  // const page=searchParams.get('page')||1;
  // const searchQuery=searchParams.get('searchQuery');
  // const classes = useStyles();
  // const [search,setSearch]=useState('');
  // const [tags,setTags]=useState([]);
  // const navigate = useNavigate();
  // const selector = useSelector(state => state)
  // const [data, setData] = useState(selector.email)
  // const [roleFromState, setRoleFromState] = useState(selector.role)
  const email = localStorage.getItem("email");
  const [role, setRole] = useState("user");

  // Auth token and refresh token state
  const existingAuthtoken = localStorage.getItem("authToken") || "";
  const [authToken] = useState(existingAuthtoken);

  // Appointment table information
  const columns = [
    { heading: 'Title', value: 'title' },
    { heading: 'Date', value: 'date' },
    { heading: 'Time', value: 'time' },
    { heading: 'Duration', value: 'duration' },
    { heading: 'Description', value: 'description' },
    { heading: 'Meeting Link', value: 'meetingLink' },
    { heading: 'Action' }
  ];
  const [dataTable, setDataTable] = useState([]);

  
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const instance = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
      headers: headers,
    });

    // Get the user's role
    instance
      .get("/api/users/profile/getdetails", { params: { email: email } })
      .then((res) => {
        setRole(res.data.role);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data);
      });


    const formData = {
      isTrainer: role === 'trainer',
      filterStartTime: Date.now()
    }
    instance
      .post("/api/scheduling/listAppointments", qs.stringify(formData))
      .then((res) => {
        let appointments = res.data;
        console.log(`appointments: ${appointments}`);

        // Transform data for this table
        for (let i = 0; i < appointments.length; i++) {
          appointments[i].id = i;
          let dateTime = new Date(appointments[i].startTime);

          appointments[i].date = `${dateTime.getFullYear()}/${dateTime.getMonth()+1}/${dateTime.getDate()+1}`;
          
          
          const dateAmOrPm = dateTime.getHours() / 12 >= 1 ? 'PM' : 'AM';

          let dateHour = dateTime.getHours();
          if (dateHour === 0) dateHour = 12;
          else if (dateHour > 12) dateHour -= 12;


          let dateMinute = dateTime.getMinutes().toString();
          if (dateMinute.length === 1) dateMinute = '0' + dateMinute;

          appointments[i].time = `${dateHour}:${dateMinute} ${dateAmOrPm}`;
        }

        setDataTable(appointments);
      })
      .catch((error) => {
        console.error(error);
        setDataTable([]);
      });
  }, [authToken, email, role]);

  const onCancelClick = (event) => {
    event.preventDefault();
console.log('hi');
    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const instance = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
      headers: headers,
    });
    const formData = {
      appointmentId: dataTable.filter(apt => apt.id === Number.parseInt(event.target.value))[0]._id
    }

    instance
      .post("/api/scheduling/bookAppointment", qs.stringify(formData))
      .then((res) => {
        console.log(res);
        setDataTable(dataTable
          .filter(apt => apt._id !== dataTable[event.target.value]._id) // filter out booked apt
          .map(apt => { // decrement ids of each row
            apt.id -= 1;
            return apt;
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }


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
                            {console.log(dataTable)}
                            {dataTable.length === 0 ?
                              <h2>You do not have any upcoming appointments!</h2>
                            :
                              <Table data={dataTable} columns={columns} onCancelClick={onCancelClick} />
                            }
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
