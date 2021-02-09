import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Line} from 'react-chartjs-2';
import { fetchDataForSite } from "../../store/data";

const Dashboard = ({site}) => {
    const dispatch = useDispatch();
    const data = {
        labels: [0, 1, 2, 3, 4],
            datasets: [{
                label: '# of Sales',
                data: [0, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }

    // "day", "week", "month", "quarter", "year"
    const dateRange = "week"
    useEffect(() => {
        dispatch(fetchDataForSite(site.id, dateRange))
    }, [dispatch, dateRange, site])

    return (
        <Line 
            data={data} 
            options={{
                title:{
                  display:true,
                  text:'Average Rainfall per month',
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                }
              }}
        />
    )
}

export default Dashboard;