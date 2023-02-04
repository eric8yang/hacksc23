import React, { Component } from 'react';
import { SignIn } from './components/auth.js';
import { SpeechDetection } from './components/speech-detect';

const Routes = () => {
    return (
        <Switch>
            <Route path="/home" component={SpeechDetection} />
            <Route path="/login" component={SignIn} />
        </Switch>
    );
};

export default Routes;