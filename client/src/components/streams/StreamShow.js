import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
    constructor(props) {
        super(props);

        //we will pass this ref prop to the video we created down below.
        this.videoRef = React.createRef();
    }
    componentDidMount() {
        // console.log(this.videoRef);
        //whenever this component is first rendered, we attempt
        //to fetch our stream and build a player
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }

        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url:  `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    componentWillUnmount() {
        //clean up some resources our component was using.
        this.player.destroy();
    }

    render() {
        if(!this.props.stream) {
            return <div> Loading...</div>
        }

        const { title, description  } = this.props.stream;
        //we don't have to write controls = {true}
        //we can just write name of prop and it'll show as true.
        return (
            <div>
                <video
                    ref = {this.videoRef}
                    style = {{ width: '100%' }}
                    controls
                />
                <h1>
                    {title}
                </h1>
                <h5>
                    {description}
                </h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);