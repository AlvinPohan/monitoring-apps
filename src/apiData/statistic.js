const { default: axios } = require("axios")

const realtime = async (device) => {
    try {
        // realtime statistic
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/realtime.php`).then(function(results) {
            return results;
        })
        
        var returnData = []

        response.data.data.map(async (value, index) => {
            if(device == value.DeviceID) {
                returnData[value.ParameterID] = value.Val
            }
        })

        return returnData
    } catch (err) {
        throw Error(err)
    }
}

// set title chart
const chartTitle = async () => {
    return [{
        voltage: {
            title: "Voltage",
            parameterID: ["VoltageR", "VoltageS", "VoltageT", "VoltageRS", "VoltageST", "VoltageTR"] 
        },
        arus: {
            title: "Arus",
            parameterID: ["ArusR", "ArusS", "ArusT"]
        },
        power_factor: {
            title: "Power Factor",
            parameterID: ["PowerFacR", "PowerFacS", "PowerFacT"],
        },
        freq: {
            title: "F Req",
            parameterID: ["Freq"]
        }
    }]
}

export {realtime, chartTitle}