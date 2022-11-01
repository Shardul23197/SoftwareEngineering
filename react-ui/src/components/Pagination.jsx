import React,{useEffect} from 'react';
import {Pagination,PaginationItem} from '@material-ui/lab';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';

import useStyles from './styles';
import {getUsersBySearch} from '../state/actions/users';


const Paginate=({page})=>{
    const classes=useStyles();
    const dispatch=useDispatch();

    useEffect(()=>{
        if(page) dispatch(getUsersBySearch(page));
    },[page]);

    return (
        <Pagination
        classes={{ul:classes.ul}}
        count={5}
        page={1}
        variant="outlined"
        color="primary"
        renderItem={(item)=>(
            <PaginationItem {... item} component={Link} to={`/dashboard?page=${1}`}/>
        )}
        />
    );
}


export default Paginate;