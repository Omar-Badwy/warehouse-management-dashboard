

export function validateProduct (productInput,setErrors,products,type) {

        
        const newErrors = {}

        // const name = productInput.name.trim()
        // const category = productInput.category
        // const count = productInput.count
        // const price = productInput.price

        const { name, categoryId, count, price} = productInput
        
        if(type === "add"){

            if(name !== ""){
    
                for(let product of products){
    
                    if(name === product.name){
    
                        newErrors.name = "This product is already added"
    
                    } else if(name.length < 3) {
    
                        newErrors.name = "Name must be at least 3 characters."
                    }
                }
    
            }else{
                newErrors.name = "Name is required"
            }
        }
        else {
            if(name !== ""){
    
                    if(name.length < 3) {
                        newErrors.name = "Name must be at least 3 characters."
                    }
    
            }else{
                newErrors.name = "Name is required"
            }
        }

        if(categoryId === "select category"){

            newErrors.category = "Category is required"
        }

        if(count === ""){

            newErrors.count = "Count is required"

        }else if( !isNaN(count)) {
            if(count <=  0){
                newErrors.count = "Count must be greater than 0."
            }
        }

        if(price === ""){
            
            newErrors.price = "Price is required"

        }else if( !isNaN(price)) {
            if(price <=  0){
                newErrors.price = "Price must be greater than 0."
            }
        }
        
        setErrors(newErrors)
        return newErrors;
    }