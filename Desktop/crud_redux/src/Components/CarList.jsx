import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCarAction } from "../Config/Actions";

function CarList() {

    const cars = useSelector(state => state.cars)

    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteCarAction(id))
    }

    return (
       <div className="container m-5">
            <Link className="btn btn-success my-3" to="/add-car">Add New Car</Link>
            <h1 className="mb-3 text-center">LIST OF CARS</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cars.map(car => (
                            <tr key={car.id}>
                                <td>{car.id}</td>
                                <td>{car.name}</td>
                                <td>{car.year}</td>
                                <td>
                                    <Link className="btn btn-primary mx-1" to={`/update-car/${car.id}`}>Update</Link>
                                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(car.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
       </div>
    );
}

export default CarList;