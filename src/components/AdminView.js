import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';


export default function AdminView({ productsData, fetchData }) {


    const [products, setProducts] = useState([])


    //Getting the productsData from the products page
    useEffect(() => {
        console.log(productsData);

        const productsArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>&#8369;{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td> <EditProduct product={product} fetchData={fetchData} /> </td> 
                    <td><ArchiveProduct product={product} isActive={product.isActive} fetchData={fetchData}/></td>
                </tr>
                )
        })

        setProducts(productsArr)

    }, [productsData])


    return(
        <>
            <h1 className="text-center my-4">Admin Dashboard</h1>

            <div className='d-flex justify-content-center gap-2 mb-4'>
                <Link className='btn btn-warning' to="/addProduct">Add Product</Link>
                <Link className='btn btn-warning' to="/orders">Orders</Link>
            </div>

            
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th className='text-white bg-dark'>ID</th>
                        <th className='text-white bg-dark'>Name</th>
                        <th className='text-white bg-dark'>Description</th>
                        <th className='text-white bg-dark'>Price</th>
                        <th className='text-white bg-dark'>Availability</th>
                        <th className='text-white bg-dark' colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products}
                </tbody>
            </Table>    
        </>

        )
}