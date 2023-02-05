import React, { Component } from 'react';
import { SignIn } from './components/auth.js';
import { SpeechDetection } from './components/speech-detect';
import { SavedFiles } from './components/saved-files';

const Routes = () => {
    return (
        <Switch>
            <Route path="/home" component={SpeechDetection} />
            <Route path="/login" component={SignIn} />
            <Route path="/saved" component={SavedFiles} />
        </Switch>
    );
};

export default Routes;