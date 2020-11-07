import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});

export const fetchCampsites = () => dispatch => {  //nested arrow function inside another => because we enabled redux thunk earlier so we can use this syntax.

    dispatch(campsitesLoading());

    return fetch(baseUrl + 'campsites')
        .then(response => response.json())
        .then(campsites => dispatch(addCampsites(campsites)));
};

export const campsitesLoading = () => ({   //Will not use redux thunk. Only 1 => it's a standard action creator (returns action object) no payload, only a type. 
    type: ActionTypes.CAMPSITES_LOADING  //This isn't Thunk so not being intercepted. Straight to reducer as normal. 
});

export const campsitesFailed = errMess => ({   //this is for campsites failed. Error message passed into this function.
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({  //this action creator has a campsites parameter, a noraml action creator, meaning it returns an object not another function. So it's not using redux thunk.
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites      //campsites arguement that was passed in, should be an array as the payload.
});

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
//below will be thunked

export const fetchPromotions = ()=> dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)));
};

export const promotionsLoading = () => ({   
    type: ActionTypes.PROMOTIONS_LOADING  
});

export const promotionsFailed = errMess => ({  
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({  
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions     
});