const { default: axios } = require("axios")


const suhu30API = async (page = 1) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/suhu_30min.php`, {params: {halaman: page}}).then(function(results) {
            return results;
        })
        return response
    } catch (err) {
        throw Error(err);
    }
}

export default suhu30API;