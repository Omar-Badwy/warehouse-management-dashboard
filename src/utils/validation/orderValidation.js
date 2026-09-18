export function validateOrder (orderInput,setErrors,products,orderModal) {
        
    const newErrors = {}

    const { clientId, productId, quantity} = orderInput

    const product = products.find( (pro) => pro.id === productId)

    if(orderModal.type !== "editOrder"){

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

    // if( quantity > product.count){
    //     newErrors.quantity = "Quantity is not available";
    // } 

    if (!Number.isInteger(Number(quantity))) {
        newErrors.quantity = "Quantity must be a whole number";
    }

    setErrors(newErrors)
    return newErrors;
}