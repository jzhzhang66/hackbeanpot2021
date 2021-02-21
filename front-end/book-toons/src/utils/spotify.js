const { default: axios } = require('axios');
const { json } = require('express');

const client_id = 'a42b65e186a0433aba79612fbcefe460';
//const client_id = '5ef10b695ac04098ae22100b10c4556b';
const client_secret = 'c1224b10cbb84909b44d610350bcfbb2';
//const client_secret = '5ae6673dc84f4bf4b92de9ea50de5a3f';
const grant_type = 'client_credentials';
const combined = client_id + ":" + client_secret;
const authorized = 'Basic ' + Buffer.from(combined).toString('base64');
const country = 'US';

// authorizes the user and grabs the access token
// output: JSON get request containing token
function getAuthorization() {
    var axios = require('axios');
    return axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        params: {
            grant_type: grant_type 
            //scopes: 'playlist-modify-public'
        },
        headers: {
            Authorization: authorized
        }
    })
        .then((response) => {
            return response.data;
        });
}

// given a user's 3 inputted artists' uri's, grabs the related artists' uri's
// args: String userArtistUri, JSON accessToken
// output: list of ids including inputted artists' and related artists'
async function getRelatedArtists(userArtistId, accessToken) {
    var artistsId = [];
    artistsId.concat(userArtistId)
    var relatedArtistsId = userArtistId.map(id => {
        return axios({
            url: `https://api.spotify.com/v1/artists/${id}/related-artists`,
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

// converts a uri to an id
// args: String uri
// output: artist id
function uriToId(uri) {
    var uriSplit = uri.toString().split(":");
    const artId = uriSplit[uriSplit.length - 1];
    return artId;
}

// given a list of artist ids, grabs the top tracks of all of the artists and returns them
// args: Array artistsId, JSON accessToken
// output: Array of topTracks of all artists
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

// main method that calls all other methods
// args: JSON mood, Array userArtists
// output: list of mood-relevant songs
async function main(mood, userArtists) {
    var token = await getAuthorization();
    //TODO: convert user input to spotify uri !
    // // var artistList = await getRelatedArtists([, token);
    // var userArtistIds = userArtists.map(async (artist) => {
    //     return await getArtistId(artist, token)
    // })

    var userArtistIds = [await getArtistId(userArtists[0], token), await getArtistId(userArtists[1], token), await getArtistId(userArtists[2], token)]

    var artistList = await getRelatedArtists(userArtistIds, token);
    //TODO: call artist top tracks
    //      call song selection function
    //      either return list of songs or create playlist
    var trackList = await getTopTracks(artistList, token);

    var finalSongs = await getSongs(trackList, mood, token);
    //console.log(finalSongs);

    //sanity checking the playlist results
    var sanityCheck = await getTitleAndArtist(finalSongs, token)

    // var searchResults = await getArtistId('Taylor Swifit', token)
    // console.log(searchResults)
    // return searchResults;

    const exName = 'pov: you\'re listening to the toons of chain of gold'
    const exDescription = 'perfect for all your listening needs—created by book toons.'
    var createdPlaylist = await createPlaylist(exName, exDescription, token)
    //console.log(createdPlaylist)

    return sanityCheck;
}

const exArtistList = ['Taylor Swift', 'Lorde', 'Ed Sheeran']

//json object for testing!!
const jsonDerulo = {
    joy: 0.2,
    sadness: 0.5,
    anger: 0.1,
    confident: 0.2
}

main(jsonDerulo, exArtistList).then(response => console.log(response));


// gets all of the relevant songs that are to be in the mood playlist
// args: Array tracklist (database of all songs to choose from), JSON jsonObj (mood obj), JSON accessToken
// output: Array of the songs in the final playlist
async function getSongs(trackList, jsonObj, accessToken) {
    trackList = trackList.sort(() => Math.random() - 0.5);
    var finalSongs = [];
    var counter = 100;
    //note: trackList.length + 100????
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
    }
    //finalSongs.slice(0, 30)
    return finalSongs;
}

// checks to see whether a given song matches the mood of the book
// args: JSON jsonObj (mood object), JSON feature (given song's feature list)
// output: boolean saying whether it passed the vibecheck
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

// scaling the mood values so they all add up to one and creates the ideal vibes for the book and converts to track features
// args: JSON jsonObj (mood object)
// output: JSON ideal track features based on mood
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

// checks to see whether a given value is between a range
// args: float rangeVal (weight of a track feature for mood (ex. how much does danceability matter for anger)), 
// float comparator (track's feature value (ex. danceability = 0.2)), float absVal (wideness of range)
// output: boolean
function inBetween(rangeVal, comparator, absVal) {
    return comparator <= rangeVal + absVal && comparator >= rangeVal - absVal;
}

// grabs the title and artist given list of trackIds
// args: Array listIds (all of the trackIds), JSON accessToken
// output: JSON songInfo (title and artist info)
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
            title: tracksObj.name, 
            songUrl: tracksObj.external_urls.spotify
        }
        songInfo.push(songJson);
    })
    return songInfo;
}

// gets top artist id using search API given user's inputted artist name
// args: String userInputArtist (name of artist), JSON accessToken
// output: id of top closest artist 
async function getArtistId(userInputArtist, accessToken) {

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
        // if something goes wrong, it used to be item.name
        artistList.push(item.id);
    })
    //currently only returning the top search result, can be modified if we add a search dropdown
    return artistList[0];
}

// creates a playlist in user's acc (currently not working oops)
// args: String name (playlist name), String description (playlist description), JSON accessToken
// output: JSON playlist object
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
        })
        .catch((error) => {
            console.log(error)
        })
}