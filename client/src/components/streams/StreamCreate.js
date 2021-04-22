import React from 'react';
import {connect} from 'react-redux';
import {createStream} from '../../actions';
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {

    //formValues doesn't mean this is some data passed down from
    //parent component.
    //we are passing it as a prop to StreamForm.
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h3>
                    Create a Stream
                </h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    };
}


export default connect(null, { createStream })(StreamCreate);