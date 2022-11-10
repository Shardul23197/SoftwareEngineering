import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
  MDBFile,
  MDBTypography,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBDropdown
} from 'mdb-react-ui-kit';
import axios from 'axios';
import qs from 'qs';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SleepCard from './SleepCard';
import Button from '@material-ui/core/Button';
import AddRounded from '@material-ui/icons/AddRounded';
import DateTimePicker from 'react-datetime-picker'
import './SleepLog.css';

export default function SleepLog() {
  let mfaRequired = localStorage.getItem('mfaRequired');
  const navigate = useNavigate();
  const selector = useSelector(state => state.email);
  const role = useSelector(state => state.role);
  const [dataFromState, setDataFromState] = useState(selector);
  const [dataFromStateRole, setDataFromStateRole] = useState(role);
  const [sleeps, setSleeps] = useState([]);
  const [sleepUploadModalVisible, setSleepUploadModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [comments, setComments] = useState('');

  // User body measurements
  const [error, setError] = useState(''); // String

  // Auth token and refresh token state
  const existingAuthtoken = localStorage.getItem('authToken') || '';
  const [authToken] = useState(existingAuthtoken);

  // Get the user's sleeps and store them
  useEffect(() => {
    setDataFromState(selector)
    setDataFromStateRole(role)
    
    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: headers
    });    
    instance.get('/api/users/log/sleep').then((res) => {
      const { data } = res;
      setSleeps(data.data);
    }).catch((err) => {
      console.error(err);
    })
  }, [authToken, role, selector]);

  const onCommentsChange = (event) => {
    setComments(event.target.value);
  }

  // Updates the wellness information of the user's profile
  const addSleep = (event) => {
    event.preventDefault();

    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: headers
    });
    const formData = {
      startDate: startDate,
      endDate: endDate,
      comments: comments
    };
    // Add the sleep the the database
    instance.post('/api/users/log/sleep', qs.stringify(formData)).then((res) => {
      toast('Sleep Added!')
      setSleepUploadModalVisible(false);
    }).catch((err) => {
      toast('Something went wrong!')
    });

    window.location.reload(false); // reload the page
  };

  /* When the user clicks log out, send post to {backend base url}/auth/logout
   * and remove all items from local storage then navigate home.
   */
  const onLogout = async (event) => {
    const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: headers
    });
      
    // Terminate the user's session information
    await instance.post('/auth/logout', {}).then((res) => {})
      .catch((error) => console.error(error));

    // Navigate to home
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="mainbody gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>

      {/* Sidebar Navigation */}
      <div class="sidebar">
        <div class="logo-details">
          <i class='bx bxl-c-plus-plus'></i>
          <span class="logo_name">Fitocity</span>
        </div>
        <ul class="nav-links">
          <li>
            <Link to='/dashboard'>
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Dashboard</span>
            </Link>
          </li>
          <li>
            <a href="#" >
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Explore</span>
            </a>
          </li>
          {role === 'trainer' ? 
          <li>
            <a href="#">
              <i class='bx bx-box' ></i>
              <span class="links_name">Workout</span>
            </a>
          </li> : ""
          }
          <li>
            <Link to='/mealLog'>
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Meal Log</span>
            </Link>
          </li>
          <li>
            <Link to='/sleepLog' class="active">
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Sleep Log</span>
            </Link>
          </li>
          <li>
            <Link to='/workoutLog'>
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Workout Log</span>
            </Link>
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
              <span class="links_name">Favrorites</span>
            </a>
          </li>
          <li>
            <Link to = '/profile'>
              <i class='bx bx-coin-stack' ></i>
              <span class="links_name">Profile</span>
            </Link>
          </li>
          <li>
            <Link to = '/settings'>
              <i class='bx bx-cog' ></i>
              <span class="links_name">Settings</span>
            </Link>
          </li>
          <li>
          <button className='logoutbutton' onClick={onLogout} >
              <i class='bx bx-coin-stack' ></i>
              <span class="links_name">Logout</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Sleeps section */}
      <div>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol g="9" xl="7">

            {/* User Profile Card */}
            <MDBCard>
              {/* User information card */}
              <MDBCardBody className="text-black p-4">

                <MDBRow className="justify-content-left align-items-center" md='4' style={{ marginBottom: '60px' }}>
                  <h1 className="fw-bold mb-1" style={{ width: '300px'}}>Sleep Log</h1>                 
                  <Button variant="contained" color="default"
                    className='material-button'
                    startIcon={<AddRounded />}
                    style={{width: '220px'}}
                    onClick={() => {
                      setSleepUploadModalVisible(!sleepUploadModalVisible);
                    }}
                  >
                  Add Sleep
                  </Button>
                </MDBRow>
                <MDBRow md='4' className="justify-content-center align-items-center h-100">
                  {sleeps ? <SleepCard sleeps={sleeps} /> : ''}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </div>

      {/* Sleep upload Modal */}
      <MDBModal show={sleepUploadModalVisible} setShow={setSleepUploadModalVisible} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
              <MDBModalHeader>
                <h2>Add Sleep</h2>
                <MDBBtn className='btn-close' color='none' onClick={() => setSleepUploadModalVisible(!sleepUploadModalVisible)}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div className='mb-3'>
                  <h4>Start Date</h4>
                  <MDBRow className="" style={{flex: 'left'}}>
                  <div style={{ flex: 'left', width: '150px'}}>
                  <DateTimePicker
                    amPmAriaLabel="Select AM/PM"
                    calendarAriaLabel="Toggle calendar"
                    clearAriaLabel="Clear value"
                    dayAriaLabel="Day"
                    hourAriaLabel="Hour"
                    maxDetail="second"
                    minuteAriaLabel="Minute"
                    monthAriaLabel="Month"
                    nativeInputAriaLabel="Date and time"
                    onChange={setStartDate}
                    secondAriaLabel="Second"
                    value={startDate}
                    yearAriaLabel="Year"
                  />
                  </div>
                  </MDBRow>
                </div>
                <hr/>
                <div className='mb-3'>
                  <h4>End Date</h4>
                  <MDBRow className="" style={{flex: 'left'}}>
                  <div style={{ flex: 'left', width: '150px'}}>
                  <DateTimePicker
                    amPmAriaLabel="Select AM/PM"
                    calendarAriaLabel="Toggle calendar"
                    clearAriaLabel="Clear value"
                    dayAriaLabel="Day"
                    hourAriaLabel="Hour"
                    maxDetail="second"
                    minuteAriaLabel="Minute"
                    monthAriaLabel="Month"
                    nativeInputAriaLabel="Date and time"
                    onChange={setEndDate}
                    secondAriaLabel="Second"
                    value={endDate}
                    yearAriaLabel="Year"
                  />
                  </div>
                  </MDBRow>
                </div>
                <hr/>
                <div className='mb-3'>
                  <h4>Coments</h4>
                  <MDBInput wrapperClass='mb-4' 
                            label='Comments' 
                            value={comments} 
                            onChange={onCommentsChange} 
                            id='formControlLg' 
                            type='textarea' 
                            size="lg" />
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={() => setSleepUploadModalVisible(!sleepUploadModalVisible)}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={addSleep}>Add</MDBBtn>
              </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}