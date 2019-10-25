import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';
import { Router,  Route  } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Firebase, { FirebaseContext } from './components/firebase';
import history from './history';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <Router history={history}>
            <Route path={ROUTES.LANDING} component={ App }/>
        </Router>
    </FirebaseContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
