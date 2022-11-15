import {React,useEffect,useState} from "react";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
//import './Chat.scss'
import { LinearProgress } from '@material-ui/core';
import ChatMessagesData from "./ChatMessages.json"


const Chat=()=> {
    let mfaRequired = localStorage.getItem('mfaRequired');
  const navigate = useNavigate();
  const selector = useSelector(state => state.email)
  const role = useSelector(state => state.role)
  const [userEmail, setUserEmail] = useState('')
  const [userFullName, setUserFullName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userCity, setUserCity] = useState('')
  const [userImage, setUserImage] = useState('')
  const [mfaQrCodeUrl, setMfaQrCodeUrl] = useState('')
  const [mfaSecret, setMfaSecret] = useState('')
  const [dataFromState, setDataFromState] = useState(selector)
  const [dataFromStateRole, setDataFromStateRole] = useState(role)
  const [trainerDetails, setTrainerDetails] = useState('')
  const [status, setStatus] = useState('todo')
  const [videos, setVideos] = useState([])
  const [varyingModal, setVaryingModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState('')
  const [varyingUpload, setVaryingUpload] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [chats,setChats]=useState([]);
  // Auth token and refresh token state
  const existingAuthtoken = localStorage.getItem('authToken') || '';
  const [authToken] = useState(existingAuthtoken);

  //const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    // try {
    //   const { data } = await axios.get("/api/message/6372749b58eadcce62d32c19");
    //   console.log(data);
    //   setChats(data);
    //   console.log(chats);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    // axios.get("/api/message/6372749b58eadcce62d32c19")
    // .then((res)=>{
    //   console.log(res.data);
    //   setChats(res.data);
    //   console.log(chats);
    // })
    fetchChats();
  },[authToken, dataFromState, mfaRequired, selector, setMfaQrCodeUrl, dataFromStateRole, role]); 
    
    
    return (
        // <div>
        //    <h1>Hey</h1>
        // </div>
        <div class='container'>
          <h1>Chat with trainer LKK</h1>
            <div class='chatbox'>
              <div class="chatbox__messages">
                <div class="chatbox__messages__user-message">
                  <div class="chatbox__messages__user-message--ind-message">
                    {ChatMessagesData.map((item)=>(
                      <li key={item.id}>
                        <p>{item.Name}</p>
                        <p>{item.content}</p></li>
                    ))}
                  </div>
                </div>
              </div>
          </div>
          <form>
            <input type="text" placeholder="Enter your message"/>
          </form>
        </div>
        // <ul>
        //     {ChatMessagesData.map((item) => (
        //         <li key={item.id}>{item.content}</li>
        //     ))}
        // </ul>
    )
}

export default Chat;