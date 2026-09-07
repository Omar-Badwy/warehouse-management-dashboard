import styles from '../../styles/dashboard.module.css'

import { Line, LineChart, CartesianGrid, Tooltip, XAxis, YAxis, } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export default function SalesChart () {
    
    const orders = useSelector( (state) => state.orders.orders)

    const weeklySales = useMemo(() => {

        const today = new Date();

        const diff = (today.getDay() + 1) % 7;

        const startOfWeek = new Date(today);

        startOfWeek.setDate(
            today.getDate() - diff
        );

        startOfWeek.setHours(0, 0, 0, 0);

        const weeklyOrders = orders.filter(
            (order) => new Date(order.createdAt) >= startOfWeek
        );


        const days = [
            "Sat",
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri"
        ];

        return days.map((day, index) => {

            const dayOrders = weeklyOrders.filter((order) => {

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

    }, [orders]);

    
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
                data={weeklySales}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
            <CartesianGrid
                stroke="#94a3b8"
                strokeDasharray="5 5"
                strokeOpacity={0.5}
            />

            <XAxis dataKey="day" stroke="black" />

            <YAxis stroke="black" strokeWidth={2} tickFormatter={(value) => value.toLocaleString()} />

            <Tooltip formatter={(value) => value.toLocaleString()} />

            <Line
                type="monotone"
                dataKey="sales"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
            />

            <RechartsDevtools />
        </LineChart>
    </section>
    )
}