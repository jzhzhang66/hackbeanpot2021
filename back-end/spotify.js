const { default: axios } = require('axios');

const client_id = 'a42b65e186a0433aba79612fbcefe460';
const client_secret = 'c1224b10cbb84909b44d610350bcfbb2';
const grant_type = 'client_credentials';
const combined = client_id + ":" + client_secret;
const authorized = 'Basic ' + Buffer.from(combined).toString('base64');
const country = 'US';

function getAuthorization() {
    var axios = require('axios');
    return axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        params: {
            grant_type: grant_type
        },
        headers: {
            Authorization: authorized
        }
    })
        .then((response) => {
            return response.data;
        });
}

async function main() {
    var token = await getAuthorization();
    //TODO: convert user input to spotify uri !
    var artistList = await getRelatedArtists(['spotify:artist:3pc0bOVB5whxmD50W79wwO', 'spotify:artist:00OF0nwYaoBSO3AnPVq3vE', 'spotify:artist:0lawSNBxNgJFQYJnQzLH8c'], token);
    //TODO: call artist top tracks
    //      call song selection function
    //      either return list of songs or create playlist
    var trackList = await getTopTracks(artistList, token);
    console.log(trackList);
    return trackList;
}

main();

async function getRelatedArtists(userArtistUri, accessToken) {
    var artistsId = [];
    artistsId = userArtistUri.map(uri => {
        const artId = uriToId(uri);
        return artId;
    })
    var relatedArtistsId = userArtistUri.map(uri => {
        const artId = uriToId(uri);
        return axios({
            url: `https://api.spotify.com/v1/artists/${artId}/related-artists`,
            method: 'get',
            headers: {
                Authorization: "Bearer " + accessToken.access_token
            }
        })
    })
    relatedArtistsId = await Promise.all(relatedArtistsId);
    relatedArtistsId.forEach(response => {
        response.data.artists.forEach(artistObj => {
            artistsId.push(artistObj.id);
        })
    })
    artistsId.concat(relatedArtistsId);
    return artistsId;
}

function uriToId(uri) {
    var uriSplit = uri.toString().split(":");
    const artId = uriSplit[uriSplit.length - 1];
    return artId;
}

async function getTopTracks(artistsId, accessToken) {
    var topTracks = [];
    var artistTopTracks = artistsId.map(id => {
        return axios({
            url: `https://api.spotify.com/v1/artists/${id}/top-tracks`,
            method: 'get',
            headers: {
                Authorization: "Bearer " + accessToken.access_token
            },
            params: {
                market: country
            }
        })
    })
    artistTopTracks = await Promise.all(artistTopTracks);
    artistTopTracks.forEach(response => {
        response.data.tracks.forEach(tracksObj => {
            topTracks.push(tracksObj.id);
        })
    })
    return topTracks;
}

