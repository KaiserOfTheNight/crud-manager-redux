export const addCarAction = (car) => {
    return { type: "Add-Car", payload: car}
}

export const updateCarAction = (newCar) => {
    return { type: "Update-Car", payload: newCar}
}

export const deleteCarAction = (id) => {
    return { type: "Delete-Car", payload: id}
}