import { FETCH_ALL, FETCH_BY_SEARCH,START_LOADING,END_LOADING} from '../actions/actionTypes';


export default (state={isLoading:true,users:[]},action)=>{
    switch (action.type){
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_BY_SEARCH:
            return { ...state, users: action.payload.data };
        case FETCH_ALL:
            return {
                  ...state,
                  users: action.payload.data,
            };
        default:
            return state;
    }
    
}