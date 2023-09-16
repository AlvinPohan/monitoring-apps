"use client"

import { useState, useEffect } from "react";

import Map, { Marker, Popup, NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./Page.module.css";

import { FaMapMarkerAlt } from "react-icons/fa";

import { location } from "@/apiData/location";
import { realtime } from "@/apiData/statistic";
import MyChart from "./cart";

export default function MapBJB() {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [selectedMarker, setSelectedMarker] = useState(null);
	const [marLocation, setMarLocation] = useState([])
	const [graph, setGraph] = useState(false)
	// const [volRvalue, setVolRvalue] = useState(null)
	const [device, setDevice] = useState(null)
	const [time, setTime] = useState(null)
	const [statistic, setStatistic] = useState([])

	useEffect(() => {
		const getLocation = async () => {
		  location().then(function(result) {
			const {data: res} = result
			// console.log(res.data)
			setMarLocation(res.data)
		  })
		}
		getLocation()
	  }, [])

    const zoomToSelectedLoc = (e, loc, index) => {
		// stop event bubble-up which triggers unnecessary events
		e.stopPropagation();
		setSelectedMarker({ loc, index });
	};

	const currentTime = async () => {
		var date = new Date(Date.now());
		const format = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
		return await format
	}

	const statisticInterval = async (device) => {
		
		setInterval(async () => {
			realtime(device).then(function(results) {
				const curStatistic = statistic
				curStatistic[device] = curStatistic[device] ? curStatistic[device] : {
					voltage: {
						voltageR: [],
						voltageS: [],
						voltageT: [],
					},
					arus: {
						arusR: [],
						arusS: [],
						arusT: [],
					},
					powerFactor: {
						powerFacR: [],
						powerFacS: [],
						powerFacT: [],
					},
					freq: []
				}
				
				// Voltage Start
				curStatistic[device].voltage.voltageR.push(results.VoltageR)
				curStatistic[device].voltage.voltageS.push(results.VoltageS)
				curStatistic[device].voltage.voltageT.push(results.VoltageT)
				// Voltage End
	
				// Arus Start
				curStatistic[device].arus.arusR.push(results.ArusR)
				curStatistic[device].arus.arusS.push(results.ArusS)
				curStatistic[device].arus.arusT.push(results.ArusT)
				// Arus End
	
				// Power Factor Start
				curStatistic[device].powerFactor.powerFacR.push(results.PowerFacR)
				curStatistic[device].powerFactor.powerFacS.push(results.PowerFacS)
				curStatistic[device].powerFactor.powerFacT.push(results.PowerFacT)
				// Power Factor End
	
				// Freq Start
				curStatistic[device].freq.push(results.Freq)
				// Freq End

				// delete if the graph is more than 6

				// voltage start
				if(curStatistic[device].voltage.voltageR.length > 6) {
					for (var key in curStatistic[device].voltage.voltageR) {
						curStatistic[device].voltage.voltageR.splice(key, 1)
					}
				}

				if(curStatistic[device].voltage.voltageS.length > 6) {
					for (var key in curStatistic[device].voltage.voltageS) {
						curStatistic[device].voltage.voltageS.splice(key, 1)
					}
				}

				if(curStatistic[device].voltage.voltageT.length > 6) {
					for (var key in curStatistic[device].voltage.voltageT) {
						curStatistic[device].voltage.voltageT.splice(key, 1)
					}
				}
				// voltage end

				// arus start
				if(curStatistic[device].arus.arusR.length > 6) {
					for (var key in curStatistic[device].arus.arusR) {
						curStatistic[device].arus.arusR.splice(key, 1)
					}
				}

				if(curStatistic[device].arus.arusS.length > 6) {
					for (var key in curStatistic[device].arus.arusS) {
						curStatistic[device].arus.arusS.splice(key, 1)
					}
				}

				if(curStatistic[device].arus.arusT.length > 6) {
					for (var key in curStatistic[device].arus.arusT) {
						curStatistic[device].arus.arusT.splice(key, 1)
					}
				}
				// arus end

				// Power Factor Start
				if(curStatistic[device].powerFactor.powerFacR.length > 6) {
					for (var key in curStatistic[device].powerFactor.powerFacR) {
						curStatistic[device].powerFactor.powerFacR.splice(key, 1)
					}
				}

				if(curStatistic[device].powerFactor.powerFacS.length > 6) {
					for (var key in curStatistic[device].powerFactor.powerFacS) {
						curStatistic[device].powerFactor.powerFacS.splice(key, 1)
					}
				}

				if(curStatistic[device].powerFactor.powerFacT.length > 6) {
					for (var key in curStatistic[device].powerFactor.powerFacT) {
						curStatistic[device].powerFactor.powerFacT.splice(key, 1)
					}
				}
				// Power Factor End

				// Freq Start
				if(curStatistic[device].freq.length > 6) {
					for (var key in curStatistic[device].freq) {
						curStatistic[device].freq.splice(key, 1)
					}
				}
				// Freq End

				const setTimer = async () => {
					curStatistic['time'] = await currentTime()
				}

				setTimer()
				
				// set to state
				
				// setGraph(true)
				setStatistic(curStatistic)
				setDevice(device)
				setTime(currentTime())
			})
		}, process.env.NEXT_PUBLIC_SET_TIMER_REFRESH);		
	}

	const popupGraph = async (e, device) => {
		e.stopPropagation();
		statisticInterval(device)
		setGraph(true)

		// const realtimeData = await realtime(device)
		// console.log(realtimeData)

	}
	
	const modalHandler = async (e) => {
		// e.stopPropagation();	
		setGraph(false)
	}

    return (
        <div className={classes.mainStyle}>
            <Map
                mapboxAccessToken={mapboxToken}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                // style={classes . mapStyle}
                initialViewState={{latitude: -6.90389, longitude: 107.61861, zoom: 10}}
                maxZoom={20}
                minZoom={3}
            >
                <GeolocateControl position="top-left" />
				<NavigationControl position="top-left" />

                {marLocation.map((loc, index) => {
					return (
						<Marker key={index} longitude={loc.Longitude} latitude={loc.Latitude}>
							<button
								type="button"
								className="cursor-pointer"
								onClick={(e) => zoomToSelectedLoc(e, loc, index)}
							>
								{<FaMapMarkerAlt size={30} color="green" />}
							</button>
						</Marker>
					);
				})}

                {selectedMarker ? (
					<Popup
						offset={25}
						latitude={selectedMarker.loc.Latitude}
						longitude={selectedMarker.loc.Longitude}
						onClose={() => {
							setSelectedMarker(null);
						}}
						closeButton={false}
					>
						<h3 className={classes.popupTitle}>{selectedMarker.loc.DeviceID}</h3>
						<div className={classes.popupInfo}>
							<span>{selectedMarker.loc.Address}</span>
                            <br />
                            <button 
								className="popup-map-button"
							>
								Panorama
							</button>
                            <button
								// className="popup-map-button" 
								type="button"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								onClick={(e) => popupGraph(e, selectedMarker.loc.DeviceID)}
							>
								Graph
							</button>
						</div>
					</Popup>
				) : null}
            </Map>
				{graph && (
					<div className="py-12 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 modal" id="modal">
						<div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
							<div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 modal-body">
								<h1 className="text-gray-800 font-xl font-bold tracking-normal leading-tight mb-4">{device}</h1>
								<MyChart graph={graph} device={device} dataStatistic={statistic} time={time}/>
								<button 
									className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" 
									onClick={(e) => modalHandler(e)} 
									aria-label="close modal" 
									role="button">
									<svg  xmlns="http://www.w3.org/2000/svg"  className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" />
										<line x1="18" y1="6" x2="6" y2="18" />
										<line x1="6" y1="6" x2="18" y2="18" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				)} 
        </div>
    )
}