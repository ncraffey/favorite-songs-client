import React from 'react';
import {Card, CardImg} from 'react-bootstrap';

const Song = ({artistNames, title, albumTitle, albumArtUrl}) => {
    return (
        <Card className={"card-style"}>
            <h5 className={"light-text song-name"}>{title}</h5>
            <CardImg src={albumArtUrl} style={{ width:"100%", height:"auto" }}/>
            <h5 className={"light-text artist-name"}>{artistNames}</h5>
            <h5 className={"light-text album-name"}>{albumTitle}</h5>
        </Card>
    )
}
export default Song
