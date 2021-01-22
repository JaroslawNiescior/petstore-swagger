const FETCH_PETS = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_PETS':
            return action.payload;
        default:
            return state;
    }
};

export default FETCH_PETS;