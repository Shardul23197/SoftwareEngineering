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
// import AddRounded from '@material-ui/icons/AddRounded';
import './WorkoutLog.css';

export default function WorkoutLog() {
  let mfaRequired = localStorage.getItem('mfaRequired');
  const navigate = useNavigate();
  const selector = useSelector(state => state.email);
  const role = useSelector(state => state.role);
  const [dataFromState, setDataFromState] = useState(selector);
  const [dataFromStateRole, setDataFromStateRole] = useState(role);
  const [workouts, setWorkouts] = useState([]);
  const [workoutUploadModalVisible, setWorkoutUploadModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [intensity, setIntensity] = useState('High');
  const [category, setCategory] = useState('Yoga');
  const [comments, setComments] = useState('');

  // User body measurements
  const [error, setError] = useState(''); // String

  // Auth token and refresh token state
  const existingAuthtoken = localStorage.getItem('authToken') || '';
  const [authToken] = useState(existingAuthtoken);

  // Get the user's workouts and store them
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
    instance.get('/api/users/log/workout').then((res) => {
      const { data } = res;
      setWorkouts(data.data);
    }).catch((err) => {
      console.error(err);
    })
  }, [authToken, role, selector]);

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const onIntensityChange = (event) => {
    setIntensity(event.target.value);
  }

  const onCategoryChange = (event) => {
    setCategory(event.target.value);
  }

  const onCommentsChange = (event) => {
    setComments(event.target.value);
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
      title: title,
      intensity: intensity,
      category: category,
      comments: comments
    };
    // Add the workout the the database
    instance.post('/api/users/log/workout', qs.stringify(formData)).then((res) => {
      toast('Workout Added!')
      setWorkoutUploadModalVisible(false);
      navigate('/workoutLog')
    }).catch((err) => {
      toast('Something went wrong!')
    });
    
    window.location.reload(false); // Reload from the cached page
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
            <Link to="/recommendation" >
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Recommendation</span>
            </Link>
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
            <Link to='/sleepLog'>
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Sleep Log</span>
            </Link>
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

                <MDBRow className="justify-content-left align-items-center" md='4' style={{ marginBottom: '60px' }}>
                  <h1 className="fw-bold mb-1" style={{ width: '300px'}}>Workout Log</h1>
                  <Button variant="contained" color="default"
                    className='material-button'
                    // startIcon={<AddRounded />}
                    style={{width: '220px'}}
                    onClick={() => {
                      setWorkoutUploadModalVisible(!workoutUploadModalVisible);
                    }}
                  >
                  Add Workout
                  </Button>
                </MDBRow>
                <MDBRow md='4' className="justify-content-center align-items-center h-100">
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
              </MDBModalHeader>
              <MDBModalBody>
                <div className='mb-3'>
                  <h4>Title</h4>
                  <MDBInput
                    type='text'
                    value={title}
                    onChange={onTitleChange}
                    labelClass='col-form-label'
                    label='Title'
                  />
                </div>
                <hr/>
                <div className='mb-3'>
                  <h4>Intensity</h4>
                  <select onChange={onIntensityChange} class="form-select" aria-label="Intensity Select">
                    <option value={'High'}>High</option>
                    <option value={'Medium'}>Medium</option>
                    <option value={'Low'}>Low</option>
                  </select>
                </div>
                <hr/>
                <div className='mb-3'>
                  <h4>Category</h4>
                  <select onChange={onCategoryChange} class="form-select" aria-label="Category Select">
                    <option value={'Yoga'}>Yoga</option>
                    <option value={'Upper Body'}>Upper Body</option>
                    <option value={'Lower Body'}>Lower Body</option>
                    <option value={'Cardio'}>Cardio</option>
                    <option value={'Other'}>Other</option>
                  </select>
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
                {/* type='button' prevents form submission */}
                <MDBBtn type='button' color='secondary' onClick={() => setWorkoutUploadModalVisible(!workoutUploadModalVisible)}>
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