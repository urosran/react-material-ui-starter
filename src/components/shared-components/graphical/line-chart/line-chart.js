import { CChart } from '@coreui/react-chartjs';
import React from 'react';
import { ProgressBar } from '../progress-bar/progress-bar';


export const LineChart = ({title}) => {

    return(
        <div className='line-chart-wrap'>
            <div className='flex row a-center jc-sb'>
            {title && <p>{title}</p>}
            <div className='flex row a-center jc-end'>
                <ProgressBar colorBottom='rgba(181, 162, 255, 0.2)' height='4px' width='70px'/>
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    disableFuture
                    label="Responsive"
                    openTo="year"
                    views={['year', 'month', 'day']}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider> */}
            </div>
        </div>
        <div className='snapshot-page-graph-overview-wrap'>
            <CChart
            type="line" 
            data={{
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                {
                    label: "Responses",
                    backgroundColor: "linear-gradient(180deg, rgba(116, 89, 217, 0.1) 0%, rgba(255, 255, 255, 0) 141.68%)",
                    borderColor: "#422F8A",
                    pointBackgroundColor: "rgba(220, 220, 220, 1)",
                    pointBorderColor: "#422F8A",
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                }
                // {
                //     label: "My Second dataset",
                //     backgroundColor: "rgba(151, 187, 205, 0.2)",
                //     borderColor: "rgba(151, 187, 205, 1)",
                //     pointBackgroundColor: "rgba(151, 187, 205, 1)",
                //     pointBorderColor: "#fff",
                //     data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                // },
                ],
            }}
            />
        </div>
    </div>
    )
}