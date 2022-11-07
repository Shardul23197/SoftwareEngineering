import React from 'react'
import Card from 'react-bootstrap/Card';

const WorkoutCard = ({ workouts }) => {

    return (
        workouts.map((workout) => {
            return (
                <Card style={{ width: '18rem', 'marginRight': '6%', 'marginBottom': '10%' }}>
                    <Card.Body>
                        <Card.Title>Workout</Card.Title>
                        <p>This is a workout</p>
                    </Card.Body>
                </Card>)
        })
    );
}

export default WorkoutCard