const { default: axios } = require('axios');
const { json } = require('express');

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
    var artistList = await getRelatedArtists(['spotify:artist:06HL4z0CvFAxyc27GXpf02', 'spotify:artist:163tK9Wjr9P9DmM0AVK7lm', 'spotify:artist:6eUKZXaKkcviH0Ku9w2n3V'], token);
    //TODO: call artist top tracks
    //      call song selection function
    //      either return list of songs or create playlist
    var trackList = await getTopTracks(artistList, token);

    //console.log(await getTitleAndArtist(['6NFyWDv5CjfwuzoCkw47Xf', '1ZY1PqizIl78geGM4xWlEA'], token));

    //json object for testing!!
    const jsonDerulo = {
        joy: 0.2,
        sadness: 0.5,
        anger: 0.1,
        confident: 0.2
    }

    var finalSongs = await getSongs(trackList, jsonDerulo, token);
    //console.log(finalSongs);

    //sanity checking the playlist results
    var sanityCheck = await getTitleAndArtist(finalSongs, token)
    console.log(sanityCheck)

    // var searchResults = await getArtistName('Taylor Swifit', token)
    // console.log(searchResults)
    // return searchResults;

    const exName = 'pov: you\'re listening to the toons of chain of gold'
    const exDescription = 'perfect for all your listening needs—created by book toons.'
    var createdPlaylist = await createPlaylist(exName, exDescription, token)
    console.log(createdPlaylist)
}

main();

async function getSongs(trackList, jsonObj, accessToken) {
    trackList = trackList.sort(() => Math.random() - 0.5);
    console.log(trackList.length);
    var finalSongs = [];
    var counter = 100;
    //note: trackList.length + 100????
    var iterations = 0;
    while (finalSongs.length < 30 && counter < trackList.length - (trackList.length % 100)) {
        var hundred = trackList.slice(counter - 100, counter);
        var hundredCopy = Array.from(hundred);

        var trackFeatures = await axios({
            url: 'https://api.spotify.com/v1/audio-features',
            method: 'get',
            headers: {
                Authorization: "Bearer " + accessToken.access_token
            },
            params: {
                ids: hundredCopy.join(",")
            }
        }).catch(error => console.log(error));

        trackFeatures.data.audio_features.forEach(track => {
            if (passesMood(jsonObj, track) && !finalSongs.includes(track.id)) {
                finalSongs.push(track.id);
            }
        })
        counter = counter + 100;
        iterations++
    }
    //finalSongs.slice(0, 30)
    console.log(iterations)
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
    danceability = inBetween(bookMoods.danceability, feature.danceability, .2);
    energy = inBetween(bookMoods.energy, feature.energy, .3);
    valence = inBetween(bookMoods.valence, feature.valence, .3);
    tempo = inBetween(bookMoods.tempo, feature.tempo, 15);
    
    return (bookMode === feature.mode && 
        valence &&
        ((danceability && energy) || (energy && tempo) || (danceability && tempo)));
}

function calcMoods(jsonObj) {
    var moodTotals = parseFloat(jsonObj.joy + jsonObj.confident + jsonObj.anger + jsonObj.sadness)
    var joy = jsonObj.joy / moodTotals
    var confident = jsonObj.confident / moodTotals
    var anger = jsonObj.anger / moodTotals
    var sadness = jsonObj.sadness / moodTotals

    const moods = {
        danceability: 0.7 * joy + 0.7 * confident + 0.5 * anger + 0.1 * sadness,
        energy: 0.7 * joy + 0.7 * confident + 0.7 * anger + 0.2 * sadness,
        valence: 0.9 * joy + 0.7 * confident + 0.05 * anger + 0.05 * sadness,
        tempo: 130 * anger + 80 * sadness
    }
    return moods;
}

function inBetween(rangeVal, comparator, absVal) {
    return comparator <= rangeVal + absVal && comparator >= rangeVal - absVal;
}

async function getTitleAndArtist(listIds, accessToken) {
    var songInfo = [];
    var songResponses = listIds.map(() => {
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

async function getArtistName(userInputArtist, accessToken) {

    var artistList = [];
    var artistResults = await axios({
            url: `https://api.spotify.com/v1/search`,
            method: 'get',
            headers: {
                Authorization: "Bearer " + accessToken.access_token
            },
            params: {
                q: userInputArtist,
                type: 'artist'
            }
        }).catch(error => console.log(error))
    artistResults.data.artists.items.forEach(item => {
        artistList.push(item.name);
    })
    return artistList;
}

async function createPlaylist(name, description, accessToken) {
    var userId = '12161275801'
    var axios = require('axios');
    return axios({
        url: `https://api.spotify.com/v1/users/${userId}/playlists`,
        method: 'post',
        params: {
            name: name,
            description: description
        },
        headers: {
            Authorization: "Bearer " + accessToken.access_token
        }
    })
        .then((response) => {
            return response.data;
        });
}