import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
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
  MDBDropdown,
  MDBCardTitle,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import axios from "axios";
import qs from "qs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Recommendation() {
  return (
    <div
      className="mainbody gradient-custom-2"
     
    >
      {/* Sidebar Navigation */}
      <div class="sidebar">
        <div class="logo-details">
          <i class="bx bxl-c-plus-plus"></i>
          <span class="logo_name">Fitocity</span>
        </div>
        <ul class="nav-links">
          <li>
            <Link to="/dashboard">
              <i class="bx bx-grid-alt"></i>
              <span class="links_name">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/recommendation" class="active">
              <i class="bx bx-grid-alt"></i>
              <span class="links_name">Recommendation</span>
            </Link>
          </li>
          {/* {role === 'trainer' ? 
          <li>
            <a href="#">
              <i class='bx bx-box' ></i>
              <span class="links_name">Workout</span>
            </a>
          </li> : ""
          } */}
          <li>
            <Link to="/mealLog">
              <i class="bx bx-grid-alt"></i>
              <span class="links_name">Meal Log</span>
            </Link>
          </li>
          <li>
            <Link to="/sleepLog">
              <i class="bx bx-grid-alt"></i>
              <span class="links_name">Sleep Log</span>
            </Link>
          </li>
          <li>
            <Link to="/workoutLog">
              <i class="bx bx-grid-alt"></i>
              <span class="links_name">Workout Log</span>
            </Link>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-message"></i>
              <span class="links_name">Messages</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-heart"></i>
              <span class="links_name">Favrorites</span>
            </a>
          </li>
          <li>
            <Link to="/profile">
              <i class="bx bx-coin-stack"></i>
              <span class="links_name">Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <i class="bx bx-cog"></i>
              <span class="links_name">Settings</span>
            </Link>
          </li>
          <li>
            <button className="logoutbutton">
              <i class="bx bx-coin-stack"></i>
              <span class="links_name">Logout</span>
            </button>
          </li>
        </ul>
      </div>

      <div>
        <MDBContainer className="py-5 section">
          <MDBRow className="justify-content-center align-items-center">
            <MDBCol g="9" xl="7" className="subsection">
              <MDBCard>
                <MDBCardBody className="text-black p-4">
                  <h2 className="mt-2 mb-1">Recommended Diet</h2>
                  <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <MDBRow>
                      <MDBCol sm="6">
                        <MDBCard background="warning">
                          <MDBCardBody>
                            <MDBCardTitle>Protien</MDBCardTitle>
                            <MDBCardText>5gm</MDBCardText>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBCard background="primary">
                          <MDBCardBody>
                            <MDBCardTitle>Fat</MDBCardTitle>
                            <MDBCardText>5gm</MDBCardText>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="6">
                        <MDBCard background="success">
                          <MDBCardBody>
                            <MDBCardTitle>Fiber</MDBCardTitle>
                            <MDBCardText>5gm</MDBCardText>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBCard background="danger">
                          <MDBCardBody>
                            <MDBCardTitle>Calcium</MDBCardTitle>
                            <MDBCardText>5gm</MDBCardText>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBAccordion alwaysOpen initialActive={1}>
                      <MDBAccordionItem collapseId={1} headerTitle="Know more:">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </MDBAccordionItem>
                    </MDBAccordion>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>

      <div>
        <MDBContainer className="py-5 h-100 section">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol g="9" xl="7" className="subsection">
              <MDBCard>
                <MDBCardBody className="text-black p-4">
                  <h2 className="mt-2 mb-1">Recommended Workouts</h2>
                  <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <MDBRow>
                      <MDBCol sm="6">
                        <MDBCard>
                          <MDBCardImage
                            src="https://mdbootstrap.com/img/new/standard/nature/182.webp"
                            alt="..."
                            position="top"
                          />
                          <MDBCardBody>
                            <MDBCardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </MDBCardText>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBCard>
                          <MDBCardImage
                            src="https://mdbootstrap.com/img/new/standard/nature/182.webp"
                            alt="..."
                            position="top"
                          />
                          <MDBCardBody>
                            <MDBCardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </MDBCardText>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBAccordion alwaysOpen initialActive={1}>
                      <MDBAccordionItem collapseId={1} headerTitle="Know more:">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </MDBAccordionItem>
                    </MDBAccordion>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>

      <div>
        <MDBContainer className="py-5 h-100 section">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol g="9" xl="7" className="subsection">
              <MDBCard>
                <MDBCardBody className="text-black p-4">
                  <h2 className="mt-2 mb-1">Recommended Sleep</h2>
                  <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <MDBRow>
                      <MDBCol sm="6">
                        <MDBCardText>
                          You should sleep atleast <strong>{}</strong> - more
                          hours
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBAccordion alwaysOpen initialActive={1}>
                      <MDBAccordionItem collapseId={1} headerTitle="Know more:">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </MDBAccordionItem>
                    </MDBAccordion>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
}
