import { CChart } from '@coreui/react-chartjs';
import React from 'react';
import { TitleInfo } from '../../text-formating/title-info/title-info';

export const DoughnutChart = ({title, info,labels, data}) => {

    return(
        <div className='doughnut-chart-wrap'>
            <TitleInfo title={title} info=""/>
            <div className='doughnut-chart'>
            <CChart
                borderWidth='10px'
                type="doughnut"
                data={{
                    labels: ["Complete Responses", "Incomplete Responses"],
                    datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: data,
                    },
                    ],
                }}
                ></CChart>
                {/* <div className='doughnut-total-responses'>393939 responses</div> */}
            </div>
        </div>
    )
}