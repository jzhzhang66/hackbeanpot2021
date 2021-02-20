var axios = require('axios')

const getPics = () => axios.get('https://photos.app.goo.gl/PGHptTMPCfyiwZq18')
    .then(response => console.log(response))

module.exports = {
    getPics
}
