import React from 'react'
import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2';

function Donut (props) {
  //console.log(props);
    const data = {
        labels: props.label,
        datasets: [
          {
            label: props.labelString,
            data: props.dataset,
            backgroundColor: ["rgb(96 165 250)", "rgb(248 113 113)", "rgb(74 222 128)", "rgb(156 163 175)"],
            borderWidth: 1,
          },
        ],
      };
      const options = {
        plugins: {
            title: {
                display: true,
                text: props.titleString,
                font: {
                    size: 24,
                  }
            }
        }
    };
    
  return (
    <div className='w-2/5'>
        <Doughnut data = {data} options = {options}/>
    </div>
  )
}

export default Donut