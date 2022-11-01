import { React, useState } from 'react';
import data from "./Dashboarddata.json";
import useStyles from './styles';
import '../../App.css'




function Users(props) {
    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(props.input)
        }
    })
    //create a new array by filtering the original array
    return (
        <ul>
            {filteredData.map((item) => (
                <div class="home-content">
                    <div class="overview-boxes">
                        <div class="card-dashboard 3">
                            <div class="card_image-dashboard">
                                <img src="https://xsgames.co/randomusers/assets/avatars/male/63.jpg" alt="" />    
                            </div>
                            <div class="card_title-dashboard">
                                <p>{item.name}</p>
                            </div>
                        </div>
                    </div>
                </div>



                // <div class="row">
                //     <div className={classes.block}>
                //         <img src="https://xsgames.co/randomusers/assets/avatars/male/63.jpg" alt=""/>
                //         <div>
                //             <h2>{item.name}</h2>
                //             <p>{item.email}</p>
                //         </div>
                //     </div>
                // </div>
                //<li key={item.name}>{item.email}</li>
            ))}
        </ul>
    )
}

export default Users;