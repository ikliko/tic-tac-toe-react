import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Gameplay from "./gameplay/Gameplay";
import './App.css'

export default function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

function Home() {
    return <Gameplay/>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}