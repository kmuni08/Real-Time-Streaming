import React from 'react';
import {connect} from 'react-redux';
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from 'lodash';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
    };

    //streams is shown as undefined currently.
    render () {
        console.log(this.props);
        if(!this.props.stream) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h3>
                    Edit a Stream
                </h3>
                <StreamForm
                    initialValues = {_.pick(this.props.stream, 'title', 'description')}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

//ownProps is the props obj shown in StreamEdit component.

const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps);
    //streams are the objects where the key of the object is the id.
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {fetchStream, editStream })(StreamEdit);