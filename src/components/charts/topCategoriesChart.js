import styles from '../../styles/dashboard.module.css'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer,} from "recharts";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function TopCategoriesChart ()  {

    const orders = useSelector( (state) => state.orders.orders )

    const products = useSelector( (state) => state.products.products )

    const categories = useSelector( (state) => state.categories.categories )

    const topCategories = 
    
        useMemo(() => {

            const today = new Date();

            const diff = (today.getDay() + 1) % 7;

            const startOfWeek = new Date(today);

            startOfWeek.setDate(today.getDate() - diff);
            startOfWeek.setHours(0, 0, 0, 0);


            const weeklyOrders = orders.filter((order) => {
                return new Date(order.createdAt) >= startOfWeek;
            });

            let soldCategories = [];

            weeklyOrders.forEach((order) => {

                order.products.forEach((orderProduct) => {

                    const product = products.find(
                        (pro) => pro.id === orderProduct.productId
                    );

                    if (!product) return;


                    const category = categories.find(
                        (cat) => cat.id === product.categoryId
                    );

                    if (!category) return;


                    const existingCategory = soldCategories.find(
                        (cat) => cat.categoryId === product.categoryId
                    );


                    if (existingCategory) {

                       existingCategory.quantity += Number(orderProduct.quantity) ;

                    } else {
                        soldCategories.push({
                            categoryId: product.categoryId,
                            name: category.name,
                            quantity: Number(orderProduct.quantity)
                        });
                    }

                });

            });

            return soldCategories
                .sort((a, b) => b.quantity - a.quantity)
                .slice(0, 5);

        }, [orders, products, categories]);


    const COLORS = [
        "#3b82f6",
        "#22c55e",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
    ];


    console.log("topCategories: ",topCategories)
    
    return (
        <section className={`${styles.chartContainer} ${styles.topCategories}`}>
            <h2>Top Categories This Week</h2>

            <ResponsiveContainer width="100%" maxHeight={900} minHeight={300}>
                <PieChart>

                    <Pie
                        data={topCategories}
                        dataKey="quantity"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={3}
                        label={({ name }) => name}
                        labelLine
                    >
                        {topCategories.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value) =>
                            value.toLocaleString()
                        }
                    />

                </PieChart>
            </ResponsiveContainer>
        </section>
    );
};