const client_id = "2795dc0e0f7f4b43909ac3ad2f2b5051"
const client_secret = "d3e4d729ca2e473ba662456399fdc06a"

const fetchClientAuthToken = () =>
    fetch('https://accounts.spotify.com/api/token', {
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
            'Content-Type':'application/x-www-form-urlencoded',
            'Accept':'application/json'
        },
        body: "grant_type=client_credentials",
        method: 'POST'
    }).then(value => value.json())

const fetchUserAuthToken = () => {
    console.log("TODO TODO TODO ")
}

const fetchRecommendations = (_token, seed_track_ids) =>
    fetch("https://api.spotify.com/v1/recommendations?seed_tracks="
        + seed_track_ids.slice(0,5).join() + "&", {
        headers: {
            "Authorization": 'Bearer ' + _token
        }
    }).then(value => value.json())

const fetchTrack = (_token) =>
    fetch("https://api.spotify.com/v1/tracks/")

const fetchArtistAlbums = (_token, artist) =>
    fetch("https://api.spotify.com/v1/recommendations?seed_tracks=" + artist
        + "&", {
        headers: {
            "Authorization" : 'Bearer ' + _token
        }
    }).then(value => value.json())

const fetchPlaylist = (_token, playlist) => {
    console.log("fetch playlist token: " + _token)
    fetch("https://api.spotify.com/v1/playlists/"
        + playlist +"/tracks?fields=items(track(name%2Chref%2Calbum(name%2Chref)))&limit=10", {
        method: 'GET',
        headers: {
            "Accept" : "application/json",
            "Authorization" : 'Bearer ' + _token
        }
    }).then((response) => {
        console.log("Your top songs?: " + JSON.stringify(response.items[0].artists));
    })
}

const fetchTopTracks = (_token, time_range, limit) =>
    fetch("https://api.spotify.com/v1/me/top/tracks?time_range=" + time_range + "&limit=" + limit, {
        method: 'GET',
        headers: {
            "Accept" : "application/json",
            "Authorization": 'Bearer ' + _token
        }
    }).then((response) => {
        console.log("Your top songs?: " + JSON.stringify(response.items[0].artists));
    })

export default {
    fetchRecommendations,
    fetchTopTracks,
    fetchPlaylist,
    fetchClientAuthToken,
    fetchUserAuthToken
}
