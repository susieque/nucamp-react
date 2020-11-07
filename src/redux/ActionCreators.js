import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchCampsites = () => dispatch => {  //nested arrow function inside another => because we enabled redux thunk earlier so we can use this syntax.

    dispatch(campsitesLoading());

    return fetch(baseUrl + 'campsites')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }    
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(campsites => dispatch(addCampsites(campsites)))
        .catch(error => dispatch(campsitesFailed(error.message)));
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
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }    
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )    
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment= (campsiteId, rating, author, text) => dispatch => {
    const newComment = {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json"
            }
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }    
        },
        error => { throw error; }
    )
    .then(response => response.json())  
    .then(response => dispatch(addComment(response)))
    .catch (error => {
        console.log('post comment', error.message);
        alert('Your comment could not be posted\nError: ' + error.message);
    });
};

export const fetchPromotions = ()=> dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }    
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )    
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
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