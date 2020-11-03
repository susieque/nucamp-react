import * as ActionTypes from './ActionTypes';

export const Campsites = (state = {
        isLoading: true,
        errMess: null,
        campsites: []
    }, action) => {
    switch (action.type) {   //below add responses to different campsites related actions to this reducer's swtich statement.
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload}; //return a new state, consists of previous state. Update values to say its no longer loading, no errMess, campsites array populated w/payload. 
        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []};  //update state to say loading is true, errMess no, campsites is empty array (haven't finished loading data yet.) 
        case ActionTypes.CAMPSITES_FAILED:
                return {...state, isLoading: false, errMess: action.payload};    
        default:
            return state;
    }
};
