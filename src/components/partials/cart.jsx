import { chartTitle, currentTime, labelTime, realtime } from "@/apiData/statistic";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale
} from "chart.js"
import { useEffect, useState } from "react";
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
    TimeScale
)

import { Bar, Line, Scatter, Bubble } from "react-chartjs-2";

export default function MyChart({graph, device, dataStatistic, time}) {
    const [title, setTitle] = useState(null)
    const [angka, setAngka] = useState(graph.VoltageR)
    const [timer, setTimer] = useState(time)
    // const [labelChart, setLabelChart] = useState(dataStatistic['time'] ? [dataStatistic['time']] : [])
    const [labelChart, setLabelChart] = useState()

    // const [voltageStatis, setVoltageStatis] = useState(dataStatistic[device]?.voltage ? dataStatistic[device]?.voltage : [])
    const [voltageStatis, setVoltageStatis] = useState([])
    // const [arusStatis, setArusStatis] = useState(dataStatistic[device]?.arus ? dataStatistic[device]?.arus : [])
    const [arusStatis, setArusStatis] = useState([])
    // const [powerFacStatis, setSetPowerFacStatis] = useState(dataStatistic[device]?.powerFactor ? dataStatistic[device]?.powerFactor : [])
    const [powerFacStatis, setSetPowerFacStatis] = useState([])
    // const [freqStatis, setFreqStatis] = useState(dataStatistic[device]?.freq ? dataStatistic[device]?.freq : [])
    const [freqStatis, setFreqStatis] = useState([])
    // console.log(labelChart)

    useEffect(() => {
        // chart title
        chartTitle().then(function(results) {
            const data = results[0]
            setTitle(data)
        })

        if(dataStatistic[device]) {
            setVoltageStatis(dataStatistic[device]?.voltage)
            setArusStatis(dataStatistic[device]?.arus)
            setSetPowerFacStatis(dataStatistic[device]?.powerFactor)
            setFreqStatis(dataStatistic[device]?.freq)
            setTimer(time)
            var newLabelChart = labelChart
            var dataTimer = dataStatistic['time']
            if(!dataTimer) {
                var date = new Date(Date.now());
                const format = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                dataTimer = format
            }
            
            if(newLabelChart) {
                if(!newLabelChart?.includes(dataTimer)) {
                    newLabelChart.push(dataTimer)
                }
                if(newLabelChart.length > 6) { 
                    for (var key in newLabelChart) {
                        newLabelChart.splice(key, 1)
                    }
                }
                setLabelChart(newLabelChart)
            } else {
                setLabelChart([dataTimer])
            }
        }
    }, [time])

    // voltage
    const optionsVoltage = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Voltage',
            }
        },
        scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
          },
    }

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const labels = labelChart;
    // console.log(time)

    const dataVoltage = {
        labels,
        datasets: [
            {
                label: 'Vol R',
                // data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                data: voltageStatis?.voltageR,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Vol S',
                // data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                data: voltageStatis?.voltageS,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1',
            },
            
            {
                label: 'Vol T',
                // data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                data: voltageStatis?.voltageT,
                borderColor: 'rgb(238, 130, 238)',
                backgroundColor: 'rgba(238, 130, 238, 0.5)',
                yAxisID: 'y1',
            },
        ],
    }

    // arus
    const optionsArus = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Arus',
            }
        },
        scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false,
              },
            },
          },
    }

    const dataArus = {
        labels,
        datasets: [
            {
                label: 'Arus R',
                // data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                data: arusStatis?.arusR,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Arus S',
                // data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                data: arusStatis?.arusS,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1',
            },
            
            {
                label: 'Arus T',
                // data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                data: arusStatis?.arusT,
                borderColor: 'rgb(238, 130, 238)',
                backgroundColor: 'rgba(238, 130, 238, 0.5)',
                yAxisID: 'y1',
            },
        ],
    }

    // power factor
    const optionsPower = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Power Factor',
            }
        },
        scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false,
              },
            },
          },
    }

    const dataPower = {
        labels,
        datasets: [
            {
                label: 'Power R',
                // data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                data: powerFacStatis?.powerFacR,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Power S',
                // data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                data: powerFacStatis?.powerFacS,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1',
            },
            
            {
                label: 'Power T',
                // data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                data: powerFacStatis?.powerFacT,
                borderColor: 'rgb(238, 130, 238)',
                backgroundColor: 'rgba(238, 130, 238, 0.5)',
                yAxisID: 'y1',
            },
        ],
    }

    // freq
    const optionsFreq = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'F Req',
            }
        },
        scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false,
              },
            },
          },
    }

    const dataFreq = {
        labels,
        datasets: [
            {
                label: 'F Req',
                // data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                data: freqStatis,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
        ],
    }

    // setInterval(() => {
    //     const newDataSet = dataSet.datasets[0].data
    //     newDataSet.push(0.5)
    //     const newData = {...dataSet, datasets:newDataSet}
    //     // setDataSet(newData)
    //     button()

    // }, 2000);

    // useEffect(() => {

        
    // }, [dataStatistic['time']])

    return (
        <>
            {title && (
                <>
                    {/* Voltage */}
                    <div className="mt-3">
                        <Line data={dataVoltage} options={optionsVoltage} />
                    </div>
                    {/* Arus */}
                    <div className="mt-3">
                        <Line data={dataArus} options={optionsArus} />
                    </div>
                    {/* Power Factor */}
                    <div className="mt-3">
                        <Line data={dataPower} options={optionsPower} />
                    </div>
                    {/* F Req */}
                    <div className="mt-3">
                        <Line data={dataFreq} options={optionsFreq} />
                    </div>
                </>
            )}
        </>
    )
}