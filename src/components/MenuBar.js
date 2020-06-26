import React from "react";
import {
    Button, Col,
    Form, Container,
    Navbar, Row,
} from "react-bootstrap";

const MenuBar = (props) => {
    return(
            <Row className={"nav-bg"}>
                <Col className={"nav-col"}>
                    <Form.Control className={props.isMobile ? "search-bar-sm search-style" :
                        "search-bar-lg search-style"} style={{"text-overflow":"ellipsis"}} placeholder={props.isMobile ?
                        "Search..." : "Search songs..."}/>
                </Col>
                <Col className={"nav-col"}>
                    <h3 className={"fav-lg"}>Favorite{props.isMobile?<br/>:""}Songs</h3>
                </Col>
                <Col className={"nav-col"}>
                    <Button className={"nav-btn-style"} href={"/login"}>
                        <h5 className={"light-text song-name"}>Login</h5>
                    </Button>
                </Col>
            </Row>
    )
}

export default MenuBar
