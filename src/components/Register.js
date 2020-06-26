import React from "react";
import {Button, Form, Container, Row, Col, FormControl} from "react-bootstrap";

// A USER ONLY REGISTERS IF THEY DON'T HAVE A SPOTIFY ACCOUNT
// OTHERWISE THEY JUST LOG IN WITH SPOTIFY

const Register = () => {
    return(
        <Container>
            <h3 style={{height:"20%"}} className={"brand-lg-lg"}>Create Account</h3>
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label><h2 className={"light-text"}>Username</h2></Form.Label>
                    <Form.Control type="username" placeholder="username" />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label><h2 className={"light-text"}>Password</h2></Form.Label>
                    <Form.Control type="password" placeholder="password" />
                </Form.Group>
                <Button variant="primary btn-block" type="submit">Sign Up</Button>
            </Form>
        </Container>
    )
}

export default Register