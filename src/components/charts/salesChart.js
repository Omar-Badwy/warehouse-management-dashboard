import styles from '../../styles/dashboard.module.css'

import { Line, LineChart, CartesianGrid, Tooltip, XAxis, YAxis, } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useMemo } from 'react';

export default function SalesChart ({filteredDate,filter}) {
    
    const Sales = useMemo(() => {

        if (filter === "week") {

            const daysOfWeek = [
                "Sat","Sun","Mon","Tue","Wed","Thu","Fri"
            ];

            return daysOfWeek.map((day, index) => {
    
                const dayOrders = filteredDate.filter((order) => {
    
                    const orderDate = new Date(order.createdAt);
    
                    const orderDayIndex =
                        (orderDate.getDay() + 1) % 7;
    
                    return orderDayIndex === index;
                });
    
    
                const sales = dayOrders.reduce(
                    (total, order) => {
    
                        const orderTotal = order.products.reduce(
                            (sum, product) => {
                                return sum + (
                                    product.quantity * product.price
                                );
                            },
                            0
                        );
    
                        return total + orderTotal;
                    },
                    0
                );
    
                return {
                    day,
                    sales
                };
            });
        } 

        if (filter === "month") { 

            const now = new Date()

            const daysInMonth = new Date( 
                now.getFullYear(), 
                now.getMonth() + 1, 0 
            ).getDate(); 

            const daysOfMonth = Array.from( { length: daysInMonth }, (_, index) => index + 1 ); 

            return daysOfMonth.map((day) => { 

                const dayOrders = filteredDate.filter((order) => { 
                    const orderDate = new Date(order.createdAt); 

                    return orderDate.getDate() === day; 
                }); 

                const sales = dayOrders.reduce( (total, order) => { 
                    
                    const orderTotal = order.products.reduce( (sum, product) => { 
                            return sum + ( product.quantity * product.price ); 
                        }, 0 
                    ); 

                    return total + orderTotal; 

                }, 0 ); 

                return { 
                    day, 
                    sales 
                }; 

            }); 
        }


        if (filter === "year") { 

            const months = [ 
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" 
            ]; 
            
            return months.map((month, index) => { 

                const monthOrders = filteredDate.filter((order) => { 
                    const orderDate = new Date(order.createdAt); 
                    return orderDate.getMonth() === index; 
                }); 

                const sales = monthOrders.reduce( (total, order) => { 

                    const orderTotal = order.products.reduce( (sum, product) => { 
                        return sum + ( product.quantity * product.price ); 
                    }, 0 ); 

                    return total + orderTotal; 

                }, 0 ); 
                
                return { 
                    month, 
                    sales 
                }; 
            }); 
        } 

        return [];

    }, [filteredDate,filter]);

    
    return(
        <section className={`${styles.chartContainer} ${styles.sales}`}>
            <h2>Sales rate this week</h2>

            <LineChart
                style={{
                    width: '100%',
                    maxWidth: 900,
                    minHeight: 300,
                    maxHeight: '70vh',
                    aspectRatio: 1.618
                }}
                responsive
                data={Sales}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
            <CartesianGrid
                stroke="var(--strokeDasharray-color)"
                strokeDasharray="5 5"
                strokeOpacity={0.5}
            />

            <XAxis dataKey={filter === "year" ? "month" : "day"} stroke="var(--stroke-color)" />

            <YAxis stroke="var(--stroke-color)" strokeWidth={2} tickFormatter={(value) => value.toLocaleString()} />

            <Tooltip formatter={(value) => value.toLocaleString()} />

            <Line
                type="monotone"
                dataKey="sales"
                stroke="var(--stroke-color)"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
            />

            <RechartsDevtools />
        </LineChart>
    </section>
    )
}