import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import MenuBar from "./MenuBar";
import TopTracks from "./TopTracks";
import InteractiveTracks from "./InteractiveTracks";
import SpotifyWebApi from "spotify-web-api-js";
import {SpotifyApiContext} from "react-spotify-api";
import UserService from "../services/UserService";
import SpotifyService from "../services/SpotifyService";

const clientId = "2795dc0e0f7f4b43909ac3ad2f2b5051";
const redirectUri = "http://localhost:3000/";
const scopes = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "user-read-playback-state"
];

class Home extends React.Component {
    constructor(props) {
        super(props);
        localStorage.setItem("token", null)
        this.state = {
            token: null,
            authenticated: false,
            loggedIn: false,
            width: window.innerWidth,
            isSpotifyUser: false,
            currentUser: {}
        }
        this.onTokenChange = this.onTokenChange.bind(this)
    }
    onTokenChange(_token) {
        console.log("Got it " + _token)
        this.setState({
            token:_token
        })
    }
    componentWillMount() {
        const params = this.getHashParams();
        let userToken = params.access_token;
        if (userToken) {
            console.log("USER TOKEN ENABLED")
            console.log("token = " + userToken)
            this.setState({
                isSpotifyUser: true
            })
            localStorage.setItem("token", userToken)
            this.setState({
                token:userToken,
                authenticated:true
            })
        } else {
            SpotifyService.fetchClientAuthToken()
                .then((inner) => {
                    let _token = inner.access_token
                    console.log("[SPOTIFY] received client auth: " + _token)
                    localStorage.setItem("token", _token);
                    console.log("[GLOBAL] set token in localStorage")
                    this.setState({
                        token:_token,
                        authenticated:true
                    })
                })
        }
        window.addEventListener('resize', (width, e) => {
            this.setState({width:window.innerWidth})
            this.forceUpdate(() => {
                console.log("RESIZE: " + this.state.token)
            })
        })
        UserService.fetchUser()
            .catch(e => {})
            .then(currentUser => {
                if(currentUser) {
                    this.setState({currentUser: currentUser})
                }
            })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("state updated :=> " + JSON.stringify(this.state))

    }
    componentDidMount() {
    }
    componentWillUnmount() {
        window.addEventListener('resize', null)
    }
    render() {
        if (this.state.authenticated) {
            console.log("Rendering... Here's the token: " + this.state.token)
            return (
                <Container>
                    <SpotifyApiContext.Provider value={this.state.token}>
                        <MenuBar style={{align: "center"}} isMobile={this.state.width < 990}/>
                        <br/>
                        {
                            this.state.token != null &&
                            (
                                <Row>
                                    <Col className={"stats-col stats-col-card-style"} sm={12} md={6}>
                                        <TopTracks token={this.state.token}
                                                   loggedIn={this.state.loggedIn}
                                                   isSpotifyUser={this.state.isSpotifyUser}/>
                                    </Col>
                                    <Col sm={12} md={6} className={"inter-col"}>
                                        <InteractiveTracks token={this.state.token}
                                                           loggedIn={this.state.loggedIn}
                                                           isSpotifyUser={this.state.isSpotifyUser}/>
                                    </Col>
                                </Row>
                            )
                        }
                    </SpotifyApiContext.Provider>
                </Container>
            )
        } else {
            return (
                <Container/>
            )
        }
    }
    getHashParams() {
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
}

export default Home
