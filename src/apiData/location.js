import axios from "axios"


const location = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/location.php`).then(function(results) {
            return results
        })
        return response
    } catch (err) {
        throw Error(err)
    }
}

export {location}