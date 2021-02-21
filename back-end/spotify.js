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
            .catch(error => console.log(error))
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
            .catch(error => console.log(error))
    })
    artistTopTracks = await Promise.all(artistTopTracks);
    artistTopTracks.forEach(response => {
        response.data.tracks.forEach(tracksObj => {
            topTracks.push(tracksObj.id);
        })
    })
    return topTracks;
}
async function main() {
    var token = await getAuthorization();
    //TODO: convert user input to spotify uri !
    var artistList = await getRelatedArtists(['spotify:artist:3pc0bOVB5whxmD50W79wwO', 'spotify:artist:00OF0nwYaoBSO3AnPVq3vE', 'spotify:artist:0lawSNBxNgJFQYJnQzLH8c'], token);
    //TODO: call artist top tracks
    //      call song selection function
    //      either return list of songs or create playlist
    var trackList = await getTopTracks(artistList, token);

    console.log(await getTitleAndArtist(['6NFyWDv5CjfwuzoCkw47Xf', '1ZY1PqizIl78geGM4xWlEA'], token));

    //json object for testing!!
    const jsonDerulo = {
        joy: 0.2,
        sadness: 0.5,
        anger: 0.1,
        confident: 0.2
    }

    var finalSongs = await getSongs(trackList, jsonDerulo, token);
    //console.log(finalSongs);
    return finalSongs;
}

main();

async function getSongs(trackList, jsonObj, accessToken) {
    trackList = trackList.sort(() => Math.random() - 0.5);
    var finalSongs = [];
    var counter = 100;
    //note: trackList.length + 100????
    while (finalSongs.length < 30 && counter < trackList.length - (trackList.length % 100)) {
        var hundred = trackList.slice(counter - 100, counter);
        var hundredCopy = Array.from(hundred);
        var trackFeatures = hundred.map(feat => {
            return axios({
                url: `https://api.spotify.com/v1/audio-features/${feat}`,
                method: 'get',
                headers: {
                    Authorization: "Bearer " + accessToken.access_token
                }
                //, 
                // params: {
                //     ids: hundredCopy.join(",")
                // }
            })
                .catch(error => console.log(error));
        })
        trackFeatures = await Promise.all(trackFeatures);
        trackFeatures.forEach(response => {
            console.log(response.data.audio_features);
            response.data.audio_features.forEach(track => {
                if (passesMood(jsonObj, track)) {
                    finalSongs.push(track.id);
                }
            })
        })
        counter = counter + 100;
    }
    return finalSongs;
}

function passesMood(jsonObj, feature) {
    var bookMoods = calcMoods(jsonObj);
    var bookMode;
    if (jsonObj.joy >= jsonObj.sadness) {
        bookMode = 1;
    }
    else {
        bookMode = 0;
    }
    return (bookMode === feature.mode &&
        inBetween(bookMoods.joy, feature.joy) &&
        inBetween(bookMoods.sadness, feature.sadness) &&
        inBetween(bookMoods.anger, feature.anger) &&
        inBetween(bookMoods.confident, feature.confidnet));
}

function calcMoods(jsonObj) {
    const moods = {
        danceability: 0.7 * jsonObj.joy + 0.7 * jsonObj.confident + 0.5 * jsonObj.anger + 0.1 * jsonObj.sadness,
        energy: 0.7 * jsonObj.joy + 0.7 * jsonObj.confident + 0.7 * jsonObj.anger + 0.2 * jsonObj.sadness,
        valence: 0.9 * jsonObj.joy + 0.7 * jsonObj.confident + 0.05 * jsonObj.anger + 0.05 * jsonObj.sadness,
        tempo: 130 * jsonObj.anger + 80 * jsonObj.sadness
    }
    return moods;
}

function inBetween(rangeVal, comparator) {
    return comparator <= rangeVal + 0.1 && comparator >= rangeVal - 0.1;
}

async function getTitleAndArtist(listIds, accessToken) {
    var songInfo = [];
    var songResponses = listIds.map(info => {
        return axios({
            url: `https://api.spotify.com/v1/tracks`,
            method: 'get',
            headers: {
                Authorization: "Bearer " + accessToken.access_token
            },
            params: {
                market: country,
                ids: listIds.join(",")
            }
        })
            .catch(error => console.log(error))
    })
    songResponses = await Promise.all(songResponses);
    songResponses[0].data.tracks.forEach(tracksObj => {
        artistList = tracksObj.artists.map((artistInfo) => {
            return artistInfo.name;
        })
        const songJson = {
            artist: artistList,
            title: tracksObj.name
        }
        songInfo.push(songJson);
    })
    return songInfo;
}
