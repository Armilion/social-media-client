import { SET_SCREAMS, SET_SCREAM, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, LOADING_UI, CLEAR_ERRORS, POST_SCREAM, SET_ERRORS, STOP_LOADING_UI, POST_COMMENT } from "../types";
import axios from 'axios';

export const getScreams = () => (dispatch) => {
	dispatch({type : LOADING_DATA});
	axios.get("/scream")
	.then(res => {
		dispatch({
			type : SET_SCREAMS,
			payload : res.data
		})
	})
	.catch(err => {
		dispatch({
			type : SET_SCREAMS,
			payload:[]
		})
	})
}

export const getScream = (screamId) => (dispatch) => {
	dispatch({type : LOADING_UI});
	axios.get(`/scream/${screamId}`)
	.then(res => {
		dispatch({
			type : SET_SCREAM,
			payload : res.data
		});
		dispatch({type : STOP_LOADING_UI});
	})
	.catch(err => {
		dispatch({
			type : SET_ERRORS,
			payload : err.response.data
		})
		console.log(err);
	})

}

export const likeScream = (screamId) => (dispatch) => {
	axios.get(`/scream/${screamId}/like`, {
        headers: {
        	Authorization: localStorage.getItem("FBIdToken")
        }
    })
	.then(res => {
		dispatch({
			type : LIKE_SCREAM,
			payload:res.data
		})
	})
	.catch(err => {
		console.log(err);
	});
}

export const unlikeScream = (screamId) => (dispatch) => {

	axios.get(`/scream/${screamId}/unlike`, {
        headers: {
        	Authorization: localStorage.getItem("FBIdToken")
        }
    })
	.then(res => 
{		dispatch({
			type : UNLIKE_SCREAM,
			payload:res.data
		})
	})
	.catch(err => {
		console.log(err);
	});
}

export const deleteScream = (screamId) => (dispatch) => {
	axios.delete(`/scream/${screamId}`)
	.then(() => {
		dispatch({type:DELETE_SCREAM, payload:screamId})
	})
	.catch(err => {
		console.log(err);
	});
}

export const postScream = (screamData) => (dispatch) => {
	dispatch({type : LOADING_UI});
	axios.post('/scream', screamData)
	.then((res) => {
		dispatch({type:POST_SCREAM, payload:res.data});
		dispatch(clearErrors());
	})
	.catch(err => {
		dispatch({type : SET_ERRORS, payload : err.response.data});
		console.log(err);
	});
}

export const postComment = (screamId, comment) => (dispatch) => {
	//dispatch({type : LOADING_UI});
	axios.post(`/scream/${screamId}/comment`, comment)
	.then((res) => {
		dispatch({type : POST_COMMENT, payload : res.data});
		dispatch(clearErrors());
	})
	.catch(err => {
		dispatch({type : SET_ERRORS, payload : err.response.data});
		console.log(err.response.data);
	});
}

export const clearErrors = () => (dispatch) => {
	dispatch({type : CLEAR_ERRORS});
}

export const getUserData = userHandle => (dispatch) => {
	dispatch({type : LOADING_DATA});
	axios.get(`/user/${userHandle}`)
	.then(res => {
		dispatch({type : SET_SCREAMS, payload : res.data.screams})
	})
	.catch(err => {
		dispatch({type : SET_SCREAMS, payload : []});
	});
} 