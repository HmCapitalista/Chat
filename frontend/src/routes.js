import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Init from './pages/Init';
import Login from './pages/Login';
import UserPage from './pages/UserPage';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Init} />
                <Route path="/login" component={Login} />
                <Route path="/user" component={UserPage} />
            </Switch>
        </BrowserRouter>
    );

}