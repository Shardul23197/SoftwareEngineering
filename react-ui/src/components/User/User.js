import {React,useState,useEffect} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';

//import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
//import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
//import InfoIcon from '@material-ui/icons/Info';
import { useDispatch } from 'react-redux';
//import moment from 'moment';
import { useNavigate } from 'react-router-dom';

//import { getPost, likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';
import axios from 'axios';
import { useSelector } from 'react-redux';



const User = ({user}) => {
    const selector = useSelector(state => state.email)
    const [userEmail, setUserEmail] = useState('')
    const [userFullName, setUserFullName] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userCity, setUserCity] = useState('')
    const [userImage, setUserImage] = useState('')
    const [dataFromState, setDataFromState] = useState(selector)
    const [trainerDetails, setTrainerDetails] = useState('')
    const [status, setStatus] = useState('todo')
    const classes = useStyles();

    useEffect(() => {
        setDataFromState(selector)
        axios.get('/api/users/profile/getdetails', { params: { email: dataFromState } })
          .then((res) => {
            setUserEmail(res.data.data.email)
            setUserCity(res.data.data.city)
            setUserFullName(res.data.data.fullName)
            setUserPhone(res.data.data.phone)
            if (!res.data.data.profileImage) {
              setUserImage("https://ui-avatars.com/api/?name=ME&size=256")
            }
            else {
              setUserImage(res.data.data.profileImage)
            }
          })
          .catch((error) => {
            if (error.response)
              console.log(error.response.data);
          })
    
        // axios.get('/api/trainer/approvals', { params: { email: dataFromState } })
        //   .then((res) => {
        //     setStatus(res.data.status)
        //   }).catch((error) => {
        //     setStatus('notfound')
        //     console.log(error)
        //   })
      }, [dataFromState, selector ])
    
  
    return (
      <Card className={classes.card} raised elevation={6}>
          <CardMedia className={classes.media} image={'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={user.name} />
          <div className={classes.overlay}>
            <Typography variant="h6">{user.name}</Typography>
          </div>
      </Card>
    );
  };
  
  

  export default User;
