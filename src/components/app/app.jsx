import React from 'react';
import './app.css';
import { Route, Switch } from 'react-router-dom';

import ListPage from '../pages/listPage';

const App = () => {
    return (
        <Switch>
            <Route 
                path="/" 
                component={ListPage}
                exact
            />
        </Switch>
    )
}

export default App;