import React from 'react'
import Card from 'react-bootstrap/Card';

const SleepCard = ({ sleeps }) => {

    return (
        sleeps.map((sleep) => {
            const startDate = new Date(sleep.startDate);
            const startDateAmOrPm = startDate.getHours() / 12 === 1 ? 'PM' : 'AM';
            const endDate = new Date(sleep.endDate);
            const endDateAmOrPm = startDate.getHours() / 12 === 1 ? 'PM' : 'AM';
            let startDateHour = startDate.getHours();
            if (startDate.getHours() === 0) startDateHour = 12;
            else if (startDate.getHours() > 12) startDateHour = startDate.getHours() - 12;
            return (
                <Card style={{ width: '18rem', 'marginRight': '6%', 'marginBottom': '10%' }}>
                    <Card.Body>
                        <Card.Title>{sleep.title}</Card.Title>
                        <Card.Subtitle style={{ 'marginBottom': '10px'}}>{new Date(sleep.date).toDateString()}</Card.Subtitle>
                        <hr style={{ 'marginTop': '5px', 'marginBottom': '5px' }}/>
                        <Card.Text style={{ 'marginBottom': '5px'}}>
                            Start:  {`${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}  ${startDateHour}:${startDate.getMinutes()}:${startDate.getSeconds()} ${startDateAmOrPm}`}
                        </Card.Text>
                        <hr style={{ 'marginTop': '5px', 'marginBottom': '5px' }}/>
                        <Card.Text style={{ 'marginBottom': '5px'}}>
                            End:  {`${endDate.getDate()}/${endDate.getMonth()}/${endDate.getFullYear()}  ${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()} ${endDateAmOrPm}`}
                        </Card.Text>
                        <hr style={{ 'marginTop': '5px', 'marginBottom': '5px' }}/>
                        <Card.Text>Comments</Card.Text>
                        <Card.Text>{sleep.comments}</Card.Text>
                    </Card.Body>
                </Card>
            )
        })
    );
}

export default SleepCard