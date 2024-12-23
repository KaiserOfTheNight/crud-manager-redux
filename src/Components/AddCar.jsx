import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCarAction } from "../Config/Actions";

function AddCar() {
    const [car, setCar] = useState({
        name: "",
        year: 0
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const Count = useSelector(state => state.cars.length)

    const handleChange = (e) => {
        setCar({...car, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addCarAction({...car, id: Count + 1}))
        navigate('/')
    }

    return (
        <div className="container">
            <form className="w-50 my-5 p-5 border shadow rounded p-5" onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" name="name" class="form-control" onChange={handleChange}/>
                </div>

                <div class="mb-3">
                    <label class="form-label">Year</label>
                    <input type="number" name="year" class="form-control" onChange={handleChange}/>
                </div>

                <button type="submit" class="btn btn-primary">Add car</button>
            </form>
        </div>
    );
}

export default AddCar;