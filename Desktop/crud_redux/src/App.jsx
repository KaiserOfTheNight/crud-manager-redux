import { BrowserRouter, Route, Routes } from "react-router-dom";
import CarList from "./Components/CarList";
import AddCar from "./Components/AddCar";
import UpdateCar from "./Components/UpdateCar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/update-car/:id" element={<UpdateCar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;