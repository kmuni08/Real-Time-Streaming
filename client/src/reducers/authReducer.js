
//in addition to having some null value or true/false
//to indicate whether user is logged in or not,
//we will have some other piece of data in here as well.
//The best way to arrange all this data is to make sure of an object.
import {SIGN_IN, SIGN_OUT} from "../actions/types";
//create initializer:
const INITIAL_STATE = {
    isSignedIn: null,
    //don't currently have userId.
    userId: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            //modify property, use spread syntax, create new obj.
            return {...state, isSignedIn: true, userId: action.payload};
        case SIGN_OUT:
            return {...state, isSignedIn: false, userId: null };
        default:
            return state;
    }
};