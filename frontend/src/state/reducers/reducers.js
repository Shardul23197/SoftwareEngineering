const INITIAL_STATE = {
    email: '',
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state, email: action.payload,
            };
        default: return state;
    }
};

export default reducer;