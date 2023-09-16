import axios from "axios"

const deviceAPI = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/device.php`).then(function(results) {
            return results
        })
        return response
    } catch (error) {
        throw Error(error)
    }
}

export default deviceAPI