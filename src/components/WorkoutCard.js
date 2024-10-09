import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DeleteWorkout from './DeleteWorkout';
import EditWorkout from './EditWorkout';

//Since props are objects when passed from one component to another, using the syntax "{workoutProp}" inside of the WorkoutCard function parameter allows us to deconstruct it from props.
export default function WorkoutCard({workoutProp, fetchData}) {
	console.log(workoutProp);

	console.log(typeof workoutProp);


	//Deconstruct the workout properties into their own variables to access it easily within your rendered cards
	//Since "workoutProp" is also an object, this allows us to deconstruct it's properties like name, description and price into it's own variables that we can use to display the information.
	const { name, duration, dateAdded, status} = workoutProp;

	//Use the state hook for this component to be able to store its state
	//States are used to keep track of information related to individual components
	// Syntax
		// const [getter, setter] = useState(initialGetterValue);
	
	//Using the state hook returns an array with the first element being a value, and the second element, as a function that's used to change the value of the first element (count)
	

	//Function that keeps track of the enrolles for a workout
	//By default, JavaScript is synchronous it executes code from the top of the file all the way to the bottom and will wait for the completion of one expression before it proceeds to the  next.
	//The setter function for useStates are asynchronous allowing it to execute separately from other codes in the program.
	//The "setCount" function is being exucted while the "console.log" is already completed resulting in the value to be displayed in the console to be behind by one count.
	

    return (
		<Col xs={12} md={4}>
			<Card className='card-view mb-4'>
				<Card.Body className='text-center'>
					<Card.Title className='mb-3'>{name}</Card.Title>
					<Card.Subtitle>Duration:</Card.Subtitle>
					<Card.Text>{duration}</Card.Text>
					<Card.Subtitle>Date Added:</Card.Subtitle>
					<Card.Text>{dateAdded}</Card.Text>
					<Card.Subtitle>Status:</Card.Subtitle>
					<Card.Text>{status}</Card.Text>
					<DeleteWorkout workout={workoutProp} fetchData={fetchData}/>
					<EditWorkout workout={workoutProp} fetchData={fetchData} />
				</Card.Body>
			</Card>
		</Col>
    )
}

//BUTTON IMPORTANT!!
//Using a function call instead will cause the app to return an error of "too many rerenders" as shown in the screenshot above. This happens because every time the component is called, the "enroll" function is triggered, updating the state and rerendering the component. This ends in an infinite loop resulting in the error.

// Check if the WorkoutCard component is getting the correct prop types
// Proptypes are used for validating information passed to a component and is a tool normally used to help developers ensure the correct information is passed from one component to the next
WorkoutCard.propTypes = {
	// The "shape" method is used to check if a prop object conforms to a specific "shape"
	workoutProp: PropTypes.shape({
		// Define the properties and their expected types
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}

