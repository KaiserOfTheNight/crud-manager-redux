const initialState = {
    cars: [
        { id: 1, name: 'Toyota', year: 2015 },
        { id: 2, name: 'Honda', year: 2010 },
        { id: 3, name: 'Ford', year: 2012 }
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