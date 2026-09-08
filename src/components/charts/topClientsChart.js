import styles from '../../styles/dashboard.module.css'

import { useSelector } from 'react-redux';
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,} from "recharts";
import { useMemo } from 'react';


export default function TopClientsChart ({filteredDate})  {

  const clients =  useSelector( (state) => state.clients.clients)

  const topClients = 

    useMemo( () => {

      const clientOrders = clients.map( (client) => {
          const clientOrders = filteredDate.filter( (order) => order.clientId === client.id) 
        
          const totalOrders = clientOrders.length
          return { name: client.name, orders: totalOrders }
      })

      return clientOrders
        .sort((a, b) => b.orders - a.orders)
        .slice(0, 3);

    }, [clients, filteredDate])

  return (
    <div className={`${styles.chartContainer} ${styles.topClients}`}>
            <h2>Top Clients This Week</h2>

            <ResponsiveContainer width="100%" maxHeight={900} minHeight={300}>
                <BarChart
                    data={topClients}
                    layout="vertical"
                    margin={{
                        top: 10,
                        right: 20,
                        left: 20,
                        bottom: 10,
                    }}
                    
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis type="number" stroke='black' tickFormatter={(value) => value.toLocaleString()}/>

                    <YAxis
                        type="category"
                        dataKey="name"
                        stroke='black' 
                    />

                    <Tooltip />

                    <Bar
                        dataKey="orders"
                        barSize={35}
                        fill={"#2BABE5"}
                        radius={4}
                        
                        fillOpacity={0.85}
                        stroke="#0369a1"
                        strokeWidth={2}
                        
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>

  );
};
