export function validateOrder (orderInput,setErrors,orderModal) {
        
    const newErrors = {}

    const { clientId, productId, quantity} = orderInput

    if(orderModal.type !== "editOrder" && !orderModal.data){

        if (clientId === "") {
            newErrors.clientId = "Client is required";
        } 
    }

    if (productId === "") {
        newErrors.productId = "Produc is required";
    }
    
    if (quantity === "" || quantity < 1) {

        newErrors.quantity = "Quantity must be at least 1";
    } 

    if (!Number.isInteger(Number(quantity))) {
        newErrors.quantity = "Quantity must be a whole number";
    }

    setErrors(newErrors)
    return newErrors;
}