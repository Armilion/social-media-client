import { SET_SCREAMS, SET_SCREAM, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM, POST_COMMENT } from "../types";

const initialState = {
	screams : [],
	scream : {},
	loading : false
}

export default function dataReducer(state = initialState, action){
	switch(action.type){
		case LOADING_DATA :
			return{
				...state,
				loading : true
			};
		case SET_SCREAMS :
			return{
				...state,
				screams: action.payload,
				loading: false

			};
		case SET_SCREAM : 
			return{
				...state,
				scream : action.payload
			}
		case LIKE_SCREAM :
		case UNLIKE_SCREAM :
			let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
			state.screams[index] = action.payload;
			if(state.scream.screamId === action.payload.screamId){ // update scream if payload updated
				state.scream= {
					...action.payload,
					comments : state.scream.comments // necesarry to add as action.payload after from like/unlike doesn't contain comments
				}
			}
			return{
				...state
			};
		case DELETE_SCREAM :
			let newScreams = state.screams.filter(scream => scream.screamId !== action.payload);
			//let index = screams.findIndex(scream => scream.screamId === action.payload);
			//screams.splice(index, 1);
			return{
				...state,
				screams : newScreams		
			}
		case POST_SCREAM : 
			state.screams.unshift(action.payload); // Ajoute l'élément au début du tableau
			return {
				...state
			}
		case POST_COMMENT : 
			let indexComment = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
			state.screams[indexComment].commentCount++;
			state.scream.comments.unshift(action.payload);
			state.scream.commentCount++;
			return {
				...state
			}
		default: return state;


	}
}