import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Notyf } from 'notyf';

export default function EditWorkout({ workout, fetchData }) {
	const notyf = new Notyf();

	const [workoutId, setWorkoutId] = useState(workout._id);
	const [name, setName] = useState(workout.name);
	const [duration, setDuration] = useState(workout.duration);
	const [showEdit, setShowEdit] = useState(false);

	const openEdit = () => {
		setShowEdit(true)
	}

	const closeEdit = () => {
		setShowEdit(false)
	}

	const editWorkout = (e, workoutId) => {
		e.preventDefault();

		fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/updateWorkout/${workoutId}`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name: name,
				duration: duration
			})
		})
		.then(res=> res.json())
		.then(data => {

			console.log(data)

			if (data.message === 'Workout updated successfully'){

				closeEdit();
				fetchData();

				notyf.success("Workout successfully added");

			} else {

				closeEdit();
				fetchData();

				notyf.error("Something went wrong. Contact System Admin.");
			}
		})
	}

	const completeWorkout = () => {

		fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${workoutId}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res=> res.json())
		.then(data => {
			console.log(data);

			if (data.error === 'Workout not found'){

				closeEdit();
				fetchData();

				notyf.error("Workout not found")

			} else if (data.message === 'Workout status updated successfully') {

				closeEdit();
				fetchData();

				notyf.success("Workout status set to completed")

			} else {

				closeEdit();
				fetchData();

				notyf.error("Something went wrong. Contact System Admin.");
			}
		})

	}

	return (
		<>
			<Button variant = "success" onClick={() => openEdit()}>Update</Button>

			<Modal show={showEdit} onHide={closeEdit}>
               <Form onSubmit={e => editWorkout(e, workoutId)}>
                   <Modal.Header closeButton>
                       <Modal.Title>Edit Workout</Modal.Title>
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
				  	   <Button variant='success' className='me-auto' onClick={completeWorkout}>Complete Workout</Button>
                       <Button variant="secondary" onClick={closeEdit}>Close</Button>
                       <Button variant="primary" type="submit">Submit</Button>
                   </Modal.Footer>
	               </Form>
	           </Modal>
	    </>
	)
}