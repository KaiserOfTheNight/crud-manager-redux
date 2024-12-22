const initialState = {
    cars : [
        { id: 1, name: 'Lamborghini', year: 2021 },
        { id: 2, name: 'Bugatti', year: 2020 },
        { id: 3, name: 'Ferrari', year: 2019 }
    ]
}


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case "Add-Car" :
            return {...state ,cars : [...state.cars, action.payload]}

        case "Update-Car" :
            const car = state.cars.find(c => c.id === parseInt(action.payload.id))

            if (car) {
                car.name = action.payload.name
                car.year = action.payload.year
            }
          
            return state

        case "Delete-Car":
            return {...state, cars:[...state.cars.filter(c => c.id !== action.payload)]}
        
        default:
            return state
    }
}

export default reducer;