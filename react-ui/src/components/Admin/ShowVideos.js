import { React, useState, useEffect } from 'react';
import "../../App.css";

export default function ShowVideos() {

  const [video, setListOfVideos] = useState([]);

  useEffect(()=>{

        const fetchVideos = async () =>{
        const response = await fetch('/api/showvideos/')
        const json = await response.json()

        if(response.ok){
          setListOfVideos(json)
        }
      }

      fetchVideos()
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
            {video.map((video)=>{
                  return (
              <table class="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Description</th>
                    <th>Trainer</th>
                    <th>Views</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{video.title}</td>
                    <td>{video.genre}</td>
                    <td>{video.description}</td>
                    <td>{video.postedby}</td>
                    <td>{video.views}</td>
                    <td>
                    <li>
                            <a href="#" class="btn btn-danger">
                              <i class="fa fa-times"></i>
                            </a>
                          </li>
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
  );
}
