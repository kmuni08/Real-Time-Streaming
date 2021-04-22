import React from 'react';
import ReactDOM from 'react-dom';
// import history from "../history";

const Modal = props => {
    //takes 2 args.
    // 1st arg is something we want to render to screen.
    //some blob of JSX.
    //2nd arg is ref to element I want to render
    //this portal into.
    return ReactDOM.createPortal(
        //want to click outside modal to close modal.
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                <div className="header"> {props.title} </div>
                <div className="content"> {props.content} </div>
                <div className="actions"> {props.actions} </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;