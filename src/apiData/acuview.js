const { default: axios } = require("axios")

const acuviewAPI = async (page = 1) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/acuview_15min.php`, {params: {halaman: page}}).then(function(results) {
            return results
        })
        return response
    } catch (err) {
        throw Error(err)
    }
}

export default acuviewAPI