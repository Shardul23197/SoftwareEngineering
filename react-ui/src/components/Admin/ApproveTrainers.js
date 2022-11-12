import { React, useState, useEffect } from 'react';

export default function ApproveTrainers() {

  const [trainer, setListOfTrainers] = useState([]);

  useEffect(()=>{

      const fetchTrainers = async () =>{
        const response = await fetch('/api/showtrainers/')
        const json = await response.json()

        if(response.ok){
          setListOfTrainers(json)
        }
      }

      fetchTrainers()
  },[])



  return (
    <div className="home-section app-trainers">
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div class="container">
        <div class="row">
          <div class="col-md-offset-1 col-md-10">
            <div class="panel">
              <div class="panel-heading">
                <div class="row">
                  <div class="col-sm-12 col-xs-12">
                    <a href="#" class="btn btn-sm btn-primary pull-left">
                      <i class="fa fa-plus-circle"></i> Add New
                    </a>
                    <form class="form-horizontal pull-right">
                      <div class="form-group">
                        <label>Show : </label>
                        <select class="form-control">
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
              <div class="panel-body table-responsive">
              {trainer.map((trainer)=>{
                  return (
                <table class="table">
                  <thead>
                  <tr>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>CONTACT</th>
                      <th>SPECIALIZATION</th>
                      <th>ACTION</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{trainer.username}</td>
                      <td>{trainer.name}</td>
                      <td>{trainer.email}</td>
                      <td>{trainer.contact}</td>
                      <td>{trainer.photo}</td>
                      <td>
                        <ul class="action-list">
                          <li>
                          <a href="#" class="btn btn-success">
                              <i class="fa fa-check"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="btn btn-danger">
                              <i class="fa fa-times"></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>);
              })}
              </div>
              <div class="panel-footer">
                <div class="row">
                  <div class="col-sm-6 col-xs-6">
                    showing <b>5</b> out of <b>25</b> entries
                  </div>
                  <div class="col-sm-6 col-xs-6">
                    <ul class="pagination hidden-xs pull-right">
                      <li>
                        <a href="#">«</a>
                      </li>
                      <li class="active">
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
                    <ul class="pagination visible-xs pull-right">
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
