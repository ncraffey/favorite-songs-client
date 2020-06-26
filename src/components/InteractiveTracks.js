import React from "react";
import {Card, CardImg, Col, Row} from "react-bootstrap";
import TopTen from "./TopTen";

const us_viral_top_50 = "37i9dQZEVXbKuaTI1Z1Afx"

const us_top_10_label = "US Top 10"
const suggested_label = "Suggested for You"
const personal_favs_label = "Personal Favorites"
const global_top_all_time = "2YRe7HRKNRvXdJBp9nXFza"

const InteractiveTracks = (props) => {
    let leftLabel, rightLabel = ""
    if (props.isSpotifyUser) {
        // if (props.loggedIn) {
            leftLabel = suggested_label
            rightLabel = us_top_10_label
        // } else {
        //     leftLabel = personal_favs_label
        //     rightLabel = suggested_label
        // }
        console.log("INTERACTIVE TOKEN: ")
        return (
            <Row>
                <Col className={"suggested-col-card-style"}>
                    <h3 className={"light-text col-title"}>{leftLabel}</h3>
                    <TopTen token={props.token} personal />
                </Col>
                <Col className={"hand-picked-col-card-style"}>
                    <Col className={"skinny-col"}>
                        <h3 className={"light-text col-title"}>{rightLabel}</h3>
                        <TopTen playlist={global_top_all_time}/>
                    </Col>
                </Col>
            </Row>
        )
    } else {
        return (
            <a href={"/register"} style={{hover:"none"}}>
                <Col className={"logged-out-col-card-style"}>
                    <Col className={"skinny-col"}>
                        <Row className={"header-card-style"}>
                            <h3 className={"light-text col-title"}>Sign up to unlock:</h3>
                        </Row>
                        <Row>
                            <h3 className={"light-text col-title"}>Personalized song suggestions</h3>
                        </Row>
                        <Row>
                            <h3 className={"light-text col-title"}>Pop charts data</h3>
                        </Row>
                        <Row>
                            <h3 className={"light-text col-title"}>Your most played songs</h3>
                        </Row>
                        <Row className={"footer-card-style"}>
                            <h3 className={"light-text col-title"}>Not a Spotify user? No problem!</h3>
                        </Row>
                    </Col>
                </Col>
            </a>


        )
    }
}

export default InteractiveTracks