const Reducer = (state, action) => {
    switch (action.type){
        case "SET_BALANCE":
            return {
                ...state,
                balance : action.payload,
            }
        default:
            return {
                ...state
            }
    }
}

export default Reducer;