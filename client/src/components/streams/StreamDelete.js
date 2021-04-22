import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
    componentDidMount() {
        //call action creator to fetch stream with the specific id (2 in our case).
        this.props.fetchStream(this.props.match.params.id);
    }

    //create lifecycle method that would attempt to call the action creator
    //to go and fetch the stream that we are trying to delete.

    renderActions() {
        const { id }= this.props.match.params;
        //helper method:
        return (
            //JSX to render buttons I want to show.
            //use React.Fragment instead of div.
            //We no longer have 2 JSX tags trying to be assigned
            //to actions. Instead we have single tag assigned to actions
            //and single tag contains 2 elements.
            //our styling is correct now since we don't have the extra div.
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">
                    Delete
                </button>
                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        }

        return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`
    }

    render () {
        return (
            <Modal
                title="Delete Stream"
                content = {this.renderContent()}
                actions = {this.renderActions()}
                onDismiss = {() => history.push('/')}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    //reason we want ownProps is to look at the url and pull the id from it.
    return { stream: state.streams[ownProps.match.params.id]}
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);

//for actions we need to pass in the JSX
//buttons.