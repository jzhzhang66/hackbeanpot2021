// module.exports = {
//     getPics
// }

//curl -X "POST" -H "Authorization: Basic ZjM4ZjAw...WY0MzE=" -d grant_type=client_credentials https://accounts.spotify.com/api/token

const client_id = 'a42b65e186a0433aba79612fbcefe460';
const client_secret = 'c1224b10cbb84909b44d610350bcfbb2';
const grant_type = 'client_credentials';
const combined = client_id + ":" + client_secret;
const authorized = 'Basic ' + Buffer.from(combined).toString('base64');

function accessToken() {
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
    var temp = await accessToken();
    console.log(temp);
}
main();
