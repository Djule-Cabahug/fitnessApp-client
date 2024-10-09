import { useState, useEffect, useContext } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import { Notyf } from 'notyf';
import { Row, Button, Modal, Form } from 'react-bootstrap';

import UserContext from '../context/UserContext';

export default function Workouts() {

	const {user} = useContext(UserContext);

	const notyf = new Notyf();

	// Checks to see if the mock data was captured
	// console.log(workoutsData);
	// console.log(workoutsData[0]);
	const [workouts, setWorkouts] = useState([]);
	const [name, setName] = useState("");
	const [duration, setDuration] = useState("");
	const [showAdd, setShowAdd] = useState(false);


	//Use the useEffect to render all available workouts
	//add user global state as its dependency to ensure that in every refresh, we run the useEffect and the fetchData() method.

	const fetchData = () => {

		fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if (data.message === "No Workouts found."){
			
				notyf.error("No workouts found")
				
			} else if (data.hasOwnProperty("workouts")) {
				
				const workoutsArr = data.workouts.map(workout => {
					return(
						<WorkoutCard workoutProp={workout} key={workout._id} fetchData={fetchData}/>
					)
				})

				setWorkouts(workoutsArr)

			} else {

				notyf.error("Something went wrong. Contact System Admin.")
			}

		});
	}

	useEffect(() => {

		fetchData();

	}, [user]);

	console.log(user);

	const openAdd = () => {
		setShowAdd(true)
	}

	const closeAdd = () => {
		setShowAdd(false)
	}
	
	const addWorkout = (e) => {

		e.preventDefault();

		fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				name: name,
				duration: duration
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			
			if (data.hasOwnProperty("_id")){

				closeAdd();
				fetchData();

				notyf.success("Workout successfully added");

			} else {

				closeAdd();
				fetchData();

				notyf.error("Something went wrong. Contact System Admin.");
			}

			setName("");
			setDuration("");
		})
	}


	return(
		<>
			<h2 className='workouts-title text-center my-4'>Workouts</h2>
			<Button className='add-workout-btn mb-3' onClick={() => {openAdd()}}>Add Workout<span className='material-symbols-outlined'>add</span></Button>

			<Modal show={showAdd} onHide={closeAdd}>
               <Form onSubmit={e => addWorkout(e)}>
                   <Modal.Header closeButton>
                       <Modal.Title>Add Workout</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>    
                       <Form.Group controlId="productName">
                           <Form.Label>Name</Form.Label>
                           <Form.Control 
                           		type="text"
                           		value = {name}
                           		onChange={e => setName(e.target.value)} 
                           		required/>
                       </Form.Group>
                       <Form.Group controlId="productDescription">
                           <Form.Label>Duration</Form.Label>
                           <Form.Control 
                           		type="text" 
                           		value = {duration}
                           		onChange={e => setDuration(e.target.value)} 
                           		required/>
                       </Form.Group>
                   </Modal.Body>
                   <Modal.Footer>
                       <Button variant="secondary" onClick={closeAdd}>Close</Button>
                       <Button variant="primary" type="submit">Submit</Button>
                   </Modal.Footer>
	               </Form>
			</Modal>

			<Row>
				{ workouts }
			</Row>
		</>
	)
}