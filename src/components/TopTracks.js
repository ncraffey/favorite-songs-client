import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TopTen from "./TopTen";

const global_top_50 = "37i9dQZEVXbMDoHDwVN2tF"
const us_top_50 = "37i9dQZEVXbLRQDuF5jeBp"

const TopTracks = (props) => {
    if (props.isSpotifyUser) {
        return(
            <Container className={"container-top-tracks"}>
                <h3 className={"light-text col-title"}>Your Top Tracks</h3>
                <Row>
                    <Col className={"skinny-col stats-inner-col-card-style"}>
                        <h3 className={"light-text col-title"}>Month</h3>
                        <TopTen token={props.token} time_range={"short_term"}/>
                    </Col>
                    <Col className={"skinny-col stats-inner-col-card-style"}>
                        <h3 className={"light-text col-title"}>Year</h3>
                        <TopTen token={props.token} time_range={"medium_term"}/>
                    </Col>
                    <Col className={"skinny-col stats-inner-col-card-style"}>
                        <h3 className={"light-text col-title"}>All</h3>
                        <TopTen token={props.token} time_range={"long_term"}/>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return(
            <Container className={"container-top-tracks"}>
                <h3 className={"light-text col-title"}>Top Tracks</h3>
                <Row>
                    <Col className={"skinny-col stats-inner-col-card-style"}>
                        <h3 className={"light-text col-title"}>Trending in the USA</h3>
                        <TopTen playlist={us_top_50}/>
                    </Col>
                    <Col className={"skinny-col stats-inner-col-card-style"}>
                        <h3 className={"light-text col-title"}>Trending Globally</h3>
                        <TopTen playlist={global_top_50}/>
                    </Col>
                    <Col className={"skinny-col stats-inner-col-card-style"}>
                        <h3 className={"light-text col-title"}>Global Top All-Time</h3>
                        <TopTen playlist={global_top_50}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default TopTracks