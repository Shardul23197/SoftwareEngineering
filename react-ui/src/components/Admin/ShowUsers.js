import { React, useState, useEffect } from 'react';
import '../../App.css'; 
import Axios from "axios";

export default function ShowUsers() {

  
  const [user, setListOfUsers] = useState([]);

  useEffect(()=>{

      const fetchUsers = async () =>{
        const response = await fetch('/api/showusers/')
        const json = await response.json()

        if(response.ok){
          setListOfUsers(json)
        }
      }

      fetchUsers()
  },[])

  return (
    <div className="home-section app-trainers">
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="container">
        <div className="row">
          <div className="col-md-offset-1 col-md-10">
            <div className="panel">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-sm-12 col-xs-12">
                    <a href="#" className="btn btn-sm btn-primary pull-left">
                      <i className="fa fa-plus-circle"></i> Add New
                    </a>
                    <form className="form-horizontal pull-right">
                      <div className="form-group">
                        <label>Show : </label>
                        <select className="form-control">
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="panel-body table-responsive">
                {user.map((user)=>{
                  return (
                    <table className="table">
                  <thead>
                    <tr>
                      <th>PHOTO</th>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>CONTACT</th>
                      <th>CITY</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{user.username}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.contact}</td>
                      <td>{user.photo}</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Vincent Williamson</td>
                      <td>vincent@gmail.com</td>
                      <td>413 406 4880</td>
                      <td>Zumba</td>
                    </tr>
                    
                  </tbody>
                </table>
                  );
                })}
                
              </div>
              <div className="panel-footer">
                <div className="row">
                  <div className="col-sm-6 col-xs-6">
                    showing <b>5</b> out of <b>25</b> entries
                  </div>
                  <div className="col-sm-6 col-xs-6">
                    <ul className="pagination hidden-xs pull-right">
                      <li>
                        <a href="#">«</a>
                      </li>
                      <li className="active">
                        <a href="#">1</a>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <a href="#">4</a>
                      </li>
                      <li>
                        <a href="#">5</a>
                      </li>
                      <li>
                        <a href="#">»</a>
                      </li>
                    </ul>
                    <ul className="pagination visible-xs pull-right">
                      <li>
                        <a href="#">«</a>
                      </li>
                      <li>
                        <a href="#">»</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
