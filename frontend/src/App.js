import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as actions from './store/actions/auth';
import BaseRouter from './routes';
import Sidepannel from './containers/Sidepannel';
import Profile from './containers/Profile';

class App extends React.Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return(
            <Router>
                <div id="frame">
                    <Sidepannel />
                    <div className="content">
                        <Profile />
                        <BaseRouter />
                    </div>
                </div>
            </Router>
        );
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(null, mapDispatchToProps)(App);