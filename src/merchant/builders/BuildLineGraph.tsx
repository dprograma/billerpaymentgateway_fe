import React from 'react'
import Chart from 'react-google-charts'
import "./styles/buildlinegraph.css"


type Props = {
}
const LineData = [
    ['x', 'Gross Volume', 'Net Volume'],
    ["JAN", 50000, 40000],
    ["FEB", 55000, 40000],
    ["MAR", 50000, 45000],
    ["APR", 70000, 43000],
    ["MAY", 60000, 30000],
    ["JUN", 70000, 40000],
    ["JUL", 80000, 50000],
    ["AUG", 55000, 45000],
    ["SEP", 60000, 55000],
    ["OCT", 80000, 46000],
    ["NOV", 75000, 50000],
    ["DEC", 90000, 60000],
]
const LineChartOptions = {
    hAxis: {
        title: 'Month',
    },
    vAxis: {
        title: 'Amount',
    },
    chartArea: { width: '80%', height: '70%' },
    series: {
        1: { curveType: 'function' },
        0: { curveType: 'function' },
        3: { color: "#F7992C" },
        4: { color: "#29ABE2" }
    },
    legend: "none",
    backgroundColor: "#FFFFFF",


}
const BuildLineGraph = (props: Props) => {
    return (
        <div className='linechart_container'>
            <Chart
                className='chart_graph'
                chartType='LineChart'
                loader={<p className='load_msg'>Updating revenue chart...</p>}
                data={LineData}
                options={LineChartOptions}
                rootProps={{ 'data-tested': 2 }}
            />
        </div>
    )
}

export default BuildLineGraph