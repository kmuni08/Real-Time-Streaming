import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    //don't know if user is signed in.
    // state = { isSignedIn: null }; //refactor to ensure we are not using component level state anymore.

    componentDidMount() {
        //callback gets called when the client is successfully loaded up.
        window.gapi.load('client:auth2', ()=> {
            window.gapi.client.init({
                clientId: '359530715456-9mjcjsc0a1e8n10ap1knjemat0t75hj6.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                //need to dispatch some initial action when we finish
                //initializing our library to indicate whether or not user is actually signed in.
                // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                // this.onAuthChange(); //not used initially
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    //gets called with boolean arg True or False
    //to indicate whether or not user is signed in.
    onAuthChange = (isSignedIn) => {
        //we call this anytime user's auth status changes.
        if(isSignedIn) {
            //need to ensure we open action creator, receive this id as arg
            //pass it through to reducer by assigning this id to action object via payload.
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    }


    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            // return <div> I don't know if we are signed in</div>
            return null;
        } else if (this.props.isSignedIn) {
            return (
                // <div>I am signed in!</div>
                <button onClick = {this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                        SignOut
                </button>
            )
        } else {
            return (
                // <div> I am not signed in</div>
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className = "google icon" />
                    Sign In With Google.
                </button>
            )
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};



export default connect(mapStateToProps,
    { signIn, signOut }
    )(GoogleAuth);