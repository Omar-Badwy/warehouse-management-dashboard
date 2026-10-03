import { useContext, useMemo } from "react";
import styles from '../../styles/orderModal.module.css'
import { orderModalContext } from "../../providers/orderModalProvider";
import { Input } from "@mantine/core";
import { validateOrder } from "../../utils/validation/orderValidation";
import { useSelector } from "react-redux";
import {formatNumber} from '../../utils/formatNumber'

function OrderForm () {

    const { orderInput, setOrderInput, orderModal, orderItems, setOrderItems, orderErrors, setOrderErrors} = useContext(orderModalContext)
    
    const clients = useSelector( (state) => state.clients.clients)

    const orders = useSelector( (state) => state.orders.orders)
     
    const clientOfEditOrder = useMemo( () => {

        if(orderModal.type === "editOrder" && orderModal.data){

            const orderOfEditOrder = orders.find( (ord) => ord.id === orderModal?.data)
    
            return clients.find( (client) => client.id === orderOfEditOrder?.clientId )
        }

        if(orderModal.type === "addOrder" && orderModal.data){
            return clients.find( (client) => client.id === orderModal?.data )
        }

        return null;

    }, [orderModal.data,clients,orders,orderModal.type])

    const products = useSelector( (state) => state.products.products)

    const newProduct = products.find( (pro) => pro.id === orderInput.productId)

    function orderInputOnChange (e) {
            setOrderInput({...orderInput, [e.target.name] : e.target.value})
        }

    function addnewProduct() {
        
        const validationErrors = validateOrder(
            orderInput,
            setOrderErrors,
            orderModal
        );

        if (Object.keys(validationErrors).length !== 0) return;

        const existingProduct = orderItems.find(
            item => item.productId === orderInput.productId
        );

        const currentQuantity = existingProduct
        ? Number(existingProduct.quantity)
        : 0;

        const newQuantity =
            currentQuantity + Number(orderInput.quantity);

        const remainingQuantity = newProduct
            ? newProduct.count - (existingProduct ? Number(existingProduct.quantity) : 0)
            : 0;

        if (newQuantity > newProduct.count) {
            setOrderErrors({
                ...orderErrors,
                quantity: `Quantity exceeds available stock. ${remainingQuantity} available.`,
            });

            return;
        }

        if (existingProduct) {

            setOrderItems(
                orderItems.map(item =>
                    item.productId === orderInput.productId
                        ? {
                            ...item,
                            quantity: newQuantity
                        }
                        : item
                )
            );

        } 
        
        else {
            setOrderItems([
                ...orderItems,
                {
                    productId: orderInput.productId,
                    quantity: Number(orderInput.quantity),
                    price: newProduct ? newProduct.price : 0,
                    status: orderInput.status
                }
            ]);
        }

        setOrderInput({
            ...orderInput,
            clientId: orderModal.type === "addOrder" && orderModal.data ? orderModal.data : orderInput.clientId,
            productId: "",
            quantity: ""
        });
    }

    function removeItem(id) {
        const items = orderItems.filter( (pro) => pro.productId !== id)
        setOrderItems(items)
    }

return(
    <>
        <div className={styles.body}>

            {/* # Client */}
            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <span className={styles.step}>01</span>
                    <div>
                        <h3>Client</h3>
                        <p>Select the client for this order.</p>
                    </div>
                </div>

                <label className={styles.field}>
                    <span>Client</span>
                        {orderModal.type === "editOrder" || orderModal.type === "addOrder" && orderModal.data ? 

                        <input className={styles.select} value={clientOfEditOrder?.name} disabled />

                        : <Input.Wrapper classNames={{error: styles.error}} error={orderErrors.clientId}>
                        <select className={styles.select} name="clientId" onChange={orderInputOnChange} value={orderInput.clientId}>
                            <option key={"select category"} value="select client">{"select client"}</option>
                            {clients.map(client => <option key={client.id} value={client.id}>{client.name}</option> )}
                            <option key={"select category"} value="others">{"others"}</option> )
                        </select>
                        </Input.Wrapper>
                        }
                </label>
            </section>

            {/* # Products */}
            <section className={styles.section}>
                <div className={styles.sectionTitle}>
                    <span className={styles.step}>02</span>
                    <div>
                        <h3>Products</h3>
                        <p>Add products and set their quantities.</p>
                    </div>
                </div>                    

                <section className={styles.productSection}>
                    <Input.Wrapper classNames={{error: styles.error}} error={orderErrors.productId}>
                        <select className={styles.select} name="productId" value={orderInput.productId}  onChange={orderInputOnChange}>
                            <option key={"select product"} value="select product">select product</option>
                            {products.map( (pro) =>  <option key={pro.id} value={pro.id}>{pro.name}</option>) } 
                        </select>
                    </Input.Wrapper>

                    <div className={styles.countSection}>
                        <Input.Wrapper classNames={{label: styles.label, error: styles.error}} label="quantity:" error={orderErrors.quantity}>
                            <input name="quantity" type="number" min="1" step="1" max={newProduct ? newProduct.count : ""} defaultValue={1} 
                                value={orderInput.quantity} onChange={orderInputOnChange} placeholder="0"/>
                        </Input.Wrapper>
                        
                        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>

                        <Input.Wrapper classNames={{label: styles.label}} label="price:" >
                            <input type="text" readOnly name="price" value={newProduct ? `${formatNumber(newProduct.price)} EGP` : 0}/>
                        </Input.Wrapper>
                        <Input.Wrapper classNames={{label: styles.label}} label="available:" >
                            <input type="text" readOnly name="available" value={newProduct ? `${formatNumber(newProduct.count)}` : 0}/>
                        </Input.Wrapper>
                        </div>
                    </div>

                    <div className={styles.money}>
                        {(orderInput.quantity * (newProduct ? newProduct.price : 0 ) ).toLocaleString()} EGP
                        <span>total</span>
                    </div>

                </section>

                <button className={styles.addProduct} onClick={ addnewProduct }>+ Add Product</button>

                {orderItems ? orderItems.map((item) => {

                    const product = products.find(
                        (product) => product.id === item.productId
                    )

                    return(

                        <section className={styles.products}>

                            <article className={styles.productCard} key={item.productId || ""}>
                                <div className={styles.productMain}>
                                    <div className={styles.icon}>
                                        {product?.name?.charAt(0) || "P"}
                                    </div>

                                    <div>
                                    <h3> {product?.name || "Product name"} </h3>
                                        <small>Product ID: {item.productId || "—"}</small>
                                    </div>
                                </div>

                                <div className={styles.fields}>
                                    <div>
                                        <label>Quantity</label>
                                        <input type="number" value={formatNumber(item.quantity) ?? 0} readOnly/>
                                    </div>

                                    <div>
                                    <label>Price</label>
                                    <input
                                        value={`${formatNumber(item.price) ?? 0} EGP`}
                                        readOnly
                                    />
                                    </div>
                                </div>

                                <div className={styles.subtotal}>
                                    <span>Subtotal</span>
                                    <strong>
                                    {formatNumber( (item.quantity ?? 0) * (item.price ?? 0) )} EGP
                                    </strong>
                                </div>

                                <button type="button" className={styles.remove} 
                                    onClick={() => removeItem(item.productId) }>
                                    Remove
                                </button>
                            </article>
                        </section>

                    )

                }) : ""}

                    
            </section>

        </div>
    </>
)
}

export default OrderForm;