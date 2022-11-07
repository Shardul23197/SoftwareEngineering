import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
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
import WorkoutCard from './WorkoutCard';
import Button from '@material-ui/core/Button';
import AddRounded from '@material-ui/icons/AddRounded';
import './WorkoutLog.css';

export default function WorkoutLog() {
  let mfaRequired = localStorage.getItem('mfaRequired');
  const navigate = useNavigate();
  const selector = useSelector(state => state.email)
  const role = useSelector(state => state.role)
  const [dataFromState, setDataFromState] = useState(selector)
  const [dataFromStateRole, setDataFromStateRole] = useState(role)
  const [workouts, setWorkouts] = useState([{title:'Workout1'}, {title:'Workout2'}])
  const [workoutUploadModalVisible, setWorkoutUploadModalVisible] = useState(false);
  const [workoutTitle, setWorkoutTitle] = useState('')
  const [workoutIntensity, setWorkoutIntensity] = useState('High')
  const [workoutCategory, setWorkoutCategory] = useState('Yoga')

  // User body measurements
  const [error, setError] = useState(''); // String

  // Auth token and refresh token state
  const existingAuthtoken = localStorage.getItem('authToken') || '';
  const [authToken] = useState(existingAuthtoken);

  //todo
  //get user data
  useEffect(() => {
    setDataFromState(selector)
    setDataFromStateRole(role)
    
    // axios.get('/api/trainer/videos', { params: { email: dataFromState } })
    // .then((res) => {
    //   setWorkouts(res.data.data)
    // }).catch((error) => {
    //   setVideos('')
    //   console.log(error)
    // })
  }, [authToken, dataFromState, mfaRequired, selector, dataFromStateRole, role]);

  const onWorkoutTitleChange = (event) => {
    setWorkoutTitle(event.target.value);
  }

  const onWorkoutIntensityChange = (event) => {
    setWorkoutIntensity(event.target.value);
  }

  const onWorkoutCategoryChange = (event) => {
    setWorkoutCategory(event.target.value);
  }

  // Updates the wellness information of the user's profile
  const addWorkout = (event) => {
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
      workoutTitle: workoutTitle,
      workoutIntensity: workoutIntensity,
      workoutCategory: workoutCategory
    }
    console.log(formData);
    // instance.post('/api/users/profile/updatewellnessinfo', qs.stringify(formData)).then((res) => {
    //   toast('Wellness Information Updated!')
    // }).catch((err) => {
    //   toast('Something went wrong!')
    // })
  }

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
            <a href="#">
              <i class='bx bx-list-ul' ></i>
              <span class="links_name">Diet</span>
            </a>
          </li>
          <li>
            <Link to='/workoutLog' class="active">
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

      {/* Workouts section */}
      <div>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol g="9" xl="7">

            {/* User Profile Card */}
            <MDBCard>
              {/* User information card */}
              <MDBCardBody className="text-black p-4">

                {/* Trainer videos */}
                <MDBRow className="justify-content-left align-items-center" md='4'>
                  <h1 className="fw-bold mb-1" style={{width: '300px'}}>Workout Log</h1>
                  <Button variant="contained" color="default"
                    className='material-button'
                    startIcon={<AddRounded />}
                    style={{width: '220px'}}
                    onClick={() => {
                      setWorkoutUploadModalVisible(!workoutUploadModalVisible);
                    }}
                  >
                  Add Workout
                  </Button>
                </MDBRow>
                <MDBRow md='4'>
                  {workouts ? <WorkoutCard workouts={workouts} /> : ''}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </div>


      {/* Workout upload Modal */}
      <MDBModal show={workoutUploadModalVisible} setShow={setWorkoutUploadModalVisible} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
              <MDBModalHeader>
                <h2>Add Workout</h2>
                <MDBBtn className='btn-close' color='none' onClick={() => setWorkoutUploadModalVisible(!workoutUploadModalVisible)}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div className='mb-3'>
                  <h4>Title</h4>
                  {workoutUploadModalVisible && (
                    <MDBInput
                      value={workoutTitle}
                      onChange={onWorkoutTitleChange}
                      labelClass='col-form-label'
                      label='Title'
                    />
                  )}
                </div>
                <hr/>
                <div className='mb-3'>
                  <h4>Intensity</h4>
                  <select class="form-select" aria-label="Intensity Select">
                    <option value={workoutIntensity} onChange={onWorkoutIntensityChange}>High</option>
                    <option value={workoutIntensity} onChange={onWorkoutIntensityChange}>Medium</option>
                    <option value={workoutIntensity} onChange={onWorkoutIntensityChange}>Low</option>
                  </select>
                </div>
                <hr/>
                <div className='mb-3'>
                  <h4>Category</h4>
                  <select class="form-select" aria-label="Category Select">
                    <option value={workoutCategory} onChange={onWorkoutCategoryChange}>Yoga</option>
                    <option value={workoutCategory} onChange={onWorkoutCategoryChange}>Upper Body</option>
                    <option value={workoutCategory} onChange={onWorkoutCategoryChange}>Lower Body</option>
                    <option value={workoutCategory} onChange={onWorkoutCategoryChange}>Cardio</option>
                    <option value={workoutCategory} onChange={onWorkoutCategoryChange}>Other</option>
                  </select>
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={() => setWorkoutUploadModalVisible(!workoutUploadModalVisible)}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={addWorkout}>Add</MDBBtn>
              </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      
    </div>
  );
}