import { useState, useContext } from 'react';
import { Form,Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';

import { Notyf } from 'notyf';

export default function AddProduct(){

	const notyf = new Notyf();

	const navigate = useNavigate();

    const {user} = useContext(UserContext);

	//input states
	const [name,setName] = useState("");
	const [description,setDescription] = useState("");
	const [price,setPrice] = useState("");

	function createProduct(e){

		//prevent submit event's default behavior
		e.preventDefault();

		let token = localStorage.getItem('token');
		console.log(token);

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`,{

			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({

				name: name,
				description: description,
				price: price

			})
		})
		.then(res => res.json())
		.then(data => {

			//data is the response of the api/server after it's been process as JS object through our res.json() method.
			console.log(data);

			if(data.error === "Product Already Exists"){

				notyf.error("Product already exists.")


			} else if (data.hasOwnProperty("_id")) {
				
				setName("")
		        setDescription("")
		        setPrice(0);

				notyf.success("Product Creation Successful")

				navigate("/products");

			} else {

				notyf.error("Something Went Wrong. Notify System Admin.")

			}

		})

	}

	return (

            (user.isAdmin === true)
            ?
            <>
                <h1 className="my-5 text-center">Add Product</h1>
                <Form onSubmit={e => createProduct(e)}>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                        	type="text"
                        	placeholder="Enter Name"
                        	required
                        	value={name}
                        	onChange={e => {setName(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                        	type="text"
                        	placeholder="Enter Description"
                        	required
                        	value={description}
                        	onChange={e => {setDescription(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                        	type="number"
                        	placeholder="Enter Price"
                        	required
                        	value={price}
                        	onChange={e => {setPrice(e.target.value)}}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="my-5">Submit</Button>
                </Form>
		    </>
            :
            <Navigate to="/products" />

	)


}