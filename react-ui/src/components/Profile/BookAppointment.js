import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom";
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
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import VideoCard from './VideoCard';
import './Profile.css'
import Navigation from '../Navigation/Navigation';
import { v4 as uuidv4 } from 'uuid';

export default function BookAppointment() {

    return(

        
        <div className="gradient-custom-2">
      <ToastContainer />
      <Navigation/>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="8">
                <div>

                <table class="table table-bordered" style={{textAlign:'center'}}>
  <thead >
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Date</th>
      <th scope="col">Start Time</th>
      <th scope="col">Available Seats</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Yoga</th>
      <td>10.12.2022</td>
      <td>10:00am</td>
      <td>30</td>
      <td>This is an introductory class</td>
      <td><button type="button" class="btn btn-primary">Book</button></td>
    </tr>
    <tr>
      <th scope="row">Yoga</th>
      <td>10.12.2022</td>
      <td>10:00am</td>
      <td>30</td>
      <td>This is an introductory class</td>
      <td><button type="button" class="btn btn-primary">Book</button></td>
    </tr>
    <tr>
      <th scope="row">Yoga</th>
      <td>10.12.2022</td>
      <td>10:00am</td>
      <td>30</td>
      <td>This is an introductory class</td>
      <td><button type="button" class="btn btn-primary">Book</button></td>
    </tr>
    <tr>
      <th scope="row">Yoga</th>
      <td>10.12.2022</td>
      <td>10:00am</td>
      <td>30</td>
      <td>This is an introductory class</td>
      <td><button type="button" class="btn btn-primary">Book</button></td>
    </tr>
  </tbody>
</table>
     
                </div>
             
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>

    );

}