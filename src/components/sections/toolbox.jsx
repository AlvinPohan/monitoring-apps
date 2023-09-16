import deviceAPI from "@/apiData/device"
import { location } from "@/apiData/location"
import { useEffect, useState } from "react"

export default function ToolBox() {
    const [locationCount, setLocationCount] = useState(0)
    const [deviceCount, setDeviceCount] = useState(0)

    useEffect(() => {
        const getLocationCount = async () => {
            location().then(function(result) {
                const {data: res} = result
                setLocationCount(res.data.length)
            })
        }
        getLocationCount()
    }, [])

    useEffect(() => {
        const getDeviceCount = async() => {
            deviceAPI().then(function(result) {
                const {data: res} = result
                setDeviceCount(res.data.length)
            })
        }
        getDeviceCount()
    })

    return (
        <div className="flex">
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                {/* Box 1 Start */}
                <div className="bg-gradient-to-b mb-5 from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                    <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                            <div className="rounded-full p-5 bg-green-600">
                                {/* <i className="fa fa-wallet fa-2x fa-inverse"></i> */}
                                <i className="fa-solid fa-gear fa-2x fa-inverse"></i>
                            </div>
                        </div>
                        <div className="flex-1 text-right md:text-center">
                            <h2 className="font-bold uppercase text-gray-600">Jumlah Lokasi</h2>
                            <p className="font-bold text-2xl">{locationCount}</p>
                        </div>
                    </div>
                </div>
                {/* Box 1 End */}
                {/* Box 2 Start */}
                <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
                    <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-4">
                            <div className="rounded-full p-5 bg-blue-600">
                                {/* <i className="fas fa-server fa-2x fa-inverse"></i> */}
                                <i className="fa-regular fa-thumbs-up fa-2x fa-inverse"></i>
                            </div>
                        </div>
                        <div className="flex-1 text-right md:text-center">
                            <h2 className="font-bold uppercase text-gray-600">Jumlah Device</h2>
                            <p className="font-bold text-3xl">{deviceCount}</p>
                        </div>
                    </div>
                </div>
                {/* Box 2 End */}
            </div>
        </div>
    )
}