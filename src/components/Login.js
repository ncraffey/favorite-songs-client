import React from "react";
import {Button, Form, Container, Row, Col, FormControl} from "react-bootstrap";

const Login = () => {
    return(
        <Container>
            <Col>
                <Row style={{height:"40%"}}>
                    <h3 className={"brand-lg-lg"}>Login</h3>
                </Row>
                <Row style={{height:"30%"}}>
                    <Button href={"http://localhost:8888/"} className={"login-btn"}>
                        <h3 className={"brand-lg"}>Login with Spotify</h3></Button>
                </Row>
                <Row style={{height:"30%"}}>
                    <Button className={"login-btn no"} href={"./register"}>
                        <h3 className={"brand-lg"}>I don't have Spotify</h3>
                    </Button>
                </Row>
            </Col>
        </Container>
    )
}

export default Login