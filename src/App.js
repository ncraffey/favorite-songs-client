import React from 'react';
import {Button, Container, Row, Col, Navbar, Form, Card} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css"
import "./styles.css"
import Home from "./components/Home"
import Login from "./components/Login"
import {
    BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import Register from "./components/Register"
import SpotifyApiContext from "react-spotify-api/dist/context";
import SpotifyService from "./services/SpotifyService";

// const token = localStorage.getItem("token");

class App extends React.Component {
    // implicit_token = ""
    constructor(props) {
        super(props);
        // this.implicit_token = SpotifyService.getAuthToken()
    }

    render() {
        // const {data} = useUser('spotify')
        return (
            // <SpotifyApiContext.Provider value={token}>
            <Router>
                <Switch>
                    <Route exact path={"/"}>
                        <Home token={this.implicit_token}/>
                    </Route>
                    <Route exact path={"/login"}>
                        <Login/>
                    </Route>
                    <Route exact path={"/register"}>
                        <Register/>
                    </Route>
                    <Route exact path={"/profile"}>
                        {/*<Profile/>*/}
                    </Route>
                </Switch>
            </Router>
            // </SpotifyApiContext.Provider>
        )
    }
}

export default App