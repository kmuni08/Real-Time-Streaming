//have action creators in here.
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from "./types";
import streams from '../apis/streams';
import history from "../history";

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

//this can be refactored:
// export const createStream = (formValues) => {
//     return (dispatch) => {
//     };
// };

export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;
    //getState returns the entire object and we wish to access the auth property of object.
    //We want to now combine userId with formValues into a single object.
    const response = await streams.post('/streams', { ...formValues, userId });
    //it's response.data because when we get a response back from axios,
    //the response obj has a ton of info about response, but we just want
    //the info returned inside the request.
    dispatch({ type: CREATE_STREAM, payload: response.data })
    //Do some programmatic navigation to
    //get the user back to the root route.
    history.push('/');
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({ type: FETCH_STREAMS, payload: response.data })
};

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`)

    dispatch({ type: FETCH_STREAM, payload: response.data })
};

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
};

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
    history.push('/');
};
