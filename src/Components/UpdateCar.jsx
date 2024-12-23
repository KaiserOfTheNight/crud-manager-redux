import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateCarAction } from "../Config/Actions";

function UpdateCar() {
    const {id} = useParams()
    const cars = useSelector(state => state.cars)
    const carUpdate = cars.find(c => c.id === parseInt(id))


    const [car, setCar] = useState({
        name: carUpdate.name,
        year: carUpdate.year
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCar({...car, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateCarAction({...car, id: id}))
        navigate('/')
    }

    return (
        <div className="container">
            <form className="w-50 my-5 p-5 border shadow rounded p-5" onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" value={car.name} name="name" class="form-control" onChange={handleChange}/>
                </div>

                <div class="mb-3">
                    <label class="form-label">Year</label>
                    <input type="number" value={car.year} name="year" class="form-control" onChange={handleChange}/>
                </div>

                <button type="submit" class="btn btn-primary">Update car</button>
            </form>
        </div>
    );
}

export default UpdateCar;











