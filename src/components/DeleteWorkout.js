import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function DeleteWorkout({workout, fetchData}){

    const notyf = new Notyf();

    const [workoutId, setWorkoutId] = useState(workout._id)

    const deleteWorkout = () => {

        fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${workoutId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            if (data.error === 'No Workout deleted'){

                fetchData();

                notyf.error("No Workout deleted");

            } else if (data.message === 'Workout deleted successfully') {

                fetchData();

                notyf.success("Workout deleted successfully");

            } else {

                fetchData();

                notyf.error("Something went wrong. Contact System Admin.");
            }
        })
    }

    return (
        <Button variant='danger' className='mx-2' onClick={deleteWorkout}>Delete</Button>
    )
}