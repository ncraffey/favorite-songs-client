import React from 'react';
import {Row, Col} from "react-bootstrap";
import Song from "./Song";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();
const global_top_50 = "37i9dQZEVXbMDoHDwVN2tF"
const global_top_all_time = "2YRe7HRKNRvXdJBp9nXFza"

class TopTen extends React.Component {
    constructor(props) {
        super(props)
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            songs: []
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
    componentDidMount() {
        if (this.props.personal) {
            if (this.props.personal) {
                console.log("RECOMMENDATIONS")
                this.fetchRecommendations()
            }
            // this.fetchUserChosenTop();
        } else if (this.props.playlist) {
            this.fetchPlaylist(this.props.playlist)
        } else {
            this.fetchTopTracks()
        }
    }
    fetchUserChosenTop() {
        this.setState({
            songs: []
        })
    }
    fetchRecommendations() {
        if (this.state.loggedIn) {
            let ids = []
            spotifyApi.getMyTopTracks({time_range: "short_term", limit: 10})
                .then((response) => {
                    ids = response.items.map((song) => {
                        return song.id
                    })

                    const seed_tracks = ids.slice(0, 5).join()
                    console.log("seeds: " + seed_tracks)

                    spotifyApi.getRecommendations({seed_tracks: seed_tracks, limit: 10})
                        .then((response) => {
                            console.log("RESP " + JSON.stringify(response))
                            this.setState({
                                songs: response.tracks.map((track) => {
                                    return ({
                                        "id": track.id,
                                        "artist": this.getArtistString(track.artists),
                                        "title": track.name,
                                        "albumTitle": track.album.name,
                                        "albumArtUrl": track.album.images[0].url
                                    })
                                })
                            })
                        })
                })
        }
    }
    fetchTopTracks() {
        if (this.state.loggedIn) {
            spotifyApi.getMyTopTracks({time_range:this.props.time_range, limit: 12})
                .then((response) => {
                    console.log("Your top songs?: " + JSON.stringify(response.items[0].artists));
                    let seen_names = []
                    let tracks = response.items.filter((song) => {
                        if (seen_names.includes(song.name)) {
                            console.log("SEEN NAME")
                            return false
                        } else {
                            seen_names.push(song.name)
                            console.log("PUSHED: " + song.name)
                            return true
                        }
                    }).slice(0, 10)
                    this.setState({
                        songs: tracks.map((song) => {
                            return ({
                                "id": song.id,
                                "artist": this.getArtistString(song.artists),
                                "title": song.name,
                                "albumTitle": song.album.name,
                                "albumArtUrl": song.album.images[0].url })}),
                    })})
        } else {
            console.log("RUH ROH")
        }
    }
    fetchPlaylist(playlist) {
        spotifyApi.getPlaylistTracks(global_top_all_time, {limit:10})
            .then((response) => {
                console.log("PLAYLIST ITEMS " + JSON.stringify(response.items))
                this.setState({
                    songs: response.items.map((item) => {
                        return ({
                            "id": item.track.id,
                            "artist": this.getArtistString(item.track.artists),
                            "title": item.track.name,
                            "albumTitle": item.track.album.name,
                            "albumArtUrl": item.track.album.images[0].url })}),
                })
            }
        )
    }
    getArtistString(artists) {
        let names = []
        artists.forEach((artist) => {
            names.push(artist.name)
        })
        return names.join(", ")
    }
    render() {
        return (
            <Col className={"outer-col"}>
                {
                    this.state.songs.map((song) => {
                        return (
                            <Song artistNames={song.artist} title={song.title}
                                  albumTitle={song.albumTitle} albumArtUrl={song.albumArtUrl}/>
                        )
                    })
                }
            </Col>
        )
    }
}

export default TopTen
//
// import React from 'react';
// import {Col} from "react-bootstrap";
// import Song from "./Song";
// import SpotifyService from "../services/SpotifyService";
// class TopTen extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             songs: null
//         }
//     }
//
//     componentDidMount() {
//         console.log("TenMOUNT")
//         let tok = localStorage.getItem("token")
//         if (this.props.playlist) {
//             SpotifyService.fetchPlaylist(tok, this.props.playlist)
//
//         } else if (this.props.time_range) {
//             SpotifyService.fetchTopTracks(tok, this.props.time_range)
//                 .then((response) => {
//                     console.log(response.type);
//                 })
//         } else if (this.props.seed_tracks) {
//             SpotifyService.fetchTopTracks(tok, this.props.seed_tracks)
//                 .then((response) => {
//                     console.log("Recommended: ");
//                 })
//         }
//     }
//     getArtistString = (artists) => {
//         let names = []
//         artists.forEach((artist) => {
//             names.push(artist.name)
//         })
//         return names.join(", ")
//     }
//     render() {
//         if (this.state.songs) {
//             return (
//                 <Col className={"outer-col"}>
//                     {
//                         this.state.songs.map((song) => {
//                             return (
//                                 <Song artistNames={song.artist} title={song.title}
//                                       albumTitle={song.albumTitle} albumArtUrl={song.albumArtUrl}/>
//                             )
//                         })
//                     }
//                 </Col>
//             )
//         } else return (
//             <div></div>
//         )
//     }
// }
//
// export default TopTen
