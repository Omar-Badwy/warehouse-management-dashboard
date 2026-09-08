import styles from '../../styles/dashboard.module.css'

import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,} from "recharts";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RechartsDevtools } from '@recharts/devtools';

export default function ProductsSalesChart ({filteredDate})  {

    const products = useSelector( (state) => state.products.products )

    const topProducts = useMemo(() => {

        let soldProducts = [];

        filteredDate.forEach((order) => {
            order.products.forEach((product) => {

                const existingProduct = soldProducts.find(
                    (pro) => pro.productId === product.productId
                );

                if (existingProduct) {
                    existingProduct.quantity += Number(product.quantity) ;
                } else {
                    soldProducts.push({
                        ...product, quantity: Number(product.quantity)
                    });
                }

            });
        });

        return soldProducts
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5)
            .map((pro) => {

                const product = products.find(
                    (item) => item.id === pro.productId
                );

                return {
                    name: product?.name,
                    quantity: Number(pro.quantity)
                };
            });

    }, [filteredDate, products]);


   return (
        <div className={`${styles.chartContainer} ${styles.topProducts}`}>
            <h2>Top Selling Products This Week</h2>

                <BarChart
                    style={{ width: '100%', maxWidth: 900, minHeight: 300, maxHeight: '70vh', aspectRatio: 1.618 }}
                    responsive
                    data={topProducts}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >

                    <CartesianGrid stroke="#94a3b8" strokeDasharray="5 5" strokeOpacity={0.5} />
                    <XAxis dataKey="name" stroke="black" />
                    
                    <YAxis stroke="black" strokeWidth={2} dataKey="quantity" tickFormatter={(value) => value.toLocaleString()}/>

                    <Tooltip defaultIndex={2} />
                    <Bar
                        dataKey="quantity"
                        fill="#0ea5e9"
                        fillOpacity={0.85}
                        stroke="#0369a1"
                        strokeWidth={2}
                        radius={4}
                        barSize={30}
                    />
                    <RechartsDevtools />
                </BarChart>
        </div>
    );
};