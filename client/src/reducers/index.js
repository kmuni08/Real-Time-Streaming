import { combineReducers } from "redux";
//make it clear what reducer we are using.
import { reducer as formReducer } from 'redux-form';
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
    // replaceMe: () => "asldfkj"
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});