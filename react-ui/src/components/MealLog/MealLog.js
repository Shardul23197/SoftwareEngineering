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
import MealCard from './MealCard';
import Button from '@material-ui/core/Button';
import AddRounded from '@material-ui/icons/AddRounded';
import './MealLog.css';

export default function MealLog() {
  let mfaRequired = localStorage.getItem('mfaRequired');
  const navigate = useNavigate();
  const selector = useSelector(state => state.email);
  const role = useSelector(state => state.role);
  const [dataFromState, setDataFromState] = useState(selector);
  const [dataFromStateRole, setDataFromStateRole] = useState(role);
  const [meals, setMeals] = useState([]);
  const [mealUploadModalVisible, setMealUploadModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');

  // User body measurements
  const [error, setError] = useState(''); // String

  // Auth token and refresh token state
  const existingAuthtoken = localStorage.getItem('authToken') || '';
  const [authToken] = useState(existingAuthtoken);

  // Get the user's meals and store them
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
    instance.get('/api/users/log/meal').then((res) => {
      const { data } = res;
      setMeals(data.data);
    }).catch((err) => {
      console.error(err);
    })
  }, [authToken, role, selector]);

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const onCaloriesChange = (event) => {
    setCalories(event.target.value);
  }

  const onFatChange = (event) => {
    setFat(event.target.value);
  }

  const onProteinChange = (event) => {
    setProtein(event.target.value);
  }

  const onCarbsChange = (event) => {
    setCarbs(event.target.value);
  }

  // Updates the wellness information of the user's profile
  const addMeal = (event) => {
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
      calories: calories,
      fat: fat,
      protein: protein,
      carbs: carbs
    };
    // Add the meal the the database
    instance.post('/api/users/log/meal', qs.stringify(formData)).then((res) => {
      toast('Meal Added!')
      setMealUploadModalVisible(false);
      navigate('/mealLog')
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
            <a href="#">
              <i class='bx bx-list-ul' ></i>
              <span class="links_name">Diet</span>
            </a>
          </li>
          <li>
            <Link to='/workoutLog'>
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Workout Log</span>
            </Link>
          </li>
          <li>
            <Link to='/mealLog' class="active">
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Meal Log</span>
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

      {/* Meals section */}
      <div>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol g="9" xl="7">

            {/* User Profile Card */}
            <MDBCard>
              {/* User information card */}
              <MDBCardBody className="text-black p-4">

                <MDBRow className="justify-content-left align-items-center" md='4' style={{ marginBottom: '60px' }}>
                  <h1 className="fw-bold mb-1" style={{ width: '300px'}}>Meal Log</h1>
                  <Button variant="contained" color="default"
                    className='material-button'
                    startIcon={<AddRounded />}
                    style={{width: '220px'}}
                    onClick={() => {
                      setMealUploadModalVisible(!mealUploadModalVisible);
                    }}
                  >
                  Add Meal
                  </Button>
                </MDBRow>
                <MDBRow md='4' className="justify-content-center align-items-center h-100">
                  {meals ? <MealCard meals={meals} /> : ''}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </div>

      {/* Meal upload Modal */}
      <MDBModal show={mealUploadModalVisible} setShow={setMealUploadModalVisible} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
              <MDBModalHeader>
                <h2>Add Meal</h2>
                <MDBBtn className='btn-close' color='none' onClick={() => setMealUploadModalVisible(!mealUploadModalVisible)}></MDBBtn>
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
                  <h4>Calories</h4>
                  <MDBRow className="" style={{flex: 'left'}}>
                  <div style={{ flex: 'left', width: '150px'}}>
                  <MDBInput
                    type='number'
                    value={calories}
                    onChange={onCaloriesChange}
                    labelClass='col-form-label'
                    label='Calories'
                  />
                  </div>
                  <p style={{ flex: 'right', width: '10px', paddingLeft: '0px' }}>g</p>
                  </MDBRow>
                </div>
                <hr/>
                <div className='mb-3'>
                  <h4>Fat</h4>
                  <MDBRow className="" style={{flex: 'left'}}>
                  <div style={{ flex: 'left', width: '150px'}}>
                  <MDBInput
                    type='number'
                    value={fat}
                    onChange={onFatChange}
                    labelClass='col-form-label'
                    label='Fat'
                  />
                  </div>
                  <p style={{ flex: 'right', width: '10px', paddingLeft: '0px' }}>g</p>
                  </MDBRow>
                </div>
                <hr/>
                <div className='mb-3'>
                  <h4>Protein</h4>
                  <MDBRow className="" style={{flex: 'left'}}>
                  <div style={{ flex: 'left', width: '150px'}}>
                  <MDBInput
                    type='number'
                    value={protein}
                    onChange={onProteinChange}
                    labelClass='col-form-label'
                    label='Protein'
                  />
                  </div>
                  <p style={{ flex: 'right', width: '10px', paddingLeft: '0px' }}>g</p>
                  </MDBRow>
                </div>
                <hr/>
                <div className='mb-3'>
                  <h4>Carbs</h4>
                  <MDBRow className="" style={{flex: 'left'}}>
                  <div style={{ flex: 'left', width: '150px'}}>
                  <MDBInput
                    type='number'
                    value={carbs}
                    onChange={onCarbsChange}
                    labelClass='col-form-label'
                    label='Carbs'
                  />
                  </div>
                  <p style={{ flex: 'right', width: '10px', paddingLeft: '0px' }}>g</p>
                  </MDBRow>
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={() => setMealUploadModalVisible(!mealUploadModalVisible)}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={addMeal}>Add</MDBBtn>
              </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}