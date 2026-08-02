
export function validateCategory (categoryInput,categories,setErrors,type) {
    
    const newErrors = {}

    const category = categoryInput.name.trim()

    if(type === "add"){

            if(category !== ""){
    
                for(let cat of categories){
    
                    if(category === cat.name){
    
                        newErrors.category = "This category is already added"
    
                    } else if(category.length <= 1) {
    
                        newErrors.category = "Name must be at least two character."
                    }
                }
    
            }else{
                newErrors.category = "Category is required"
            }
        }
        else {
            if(category !== ""){
    
                    if(category.length <= 1) {
                        newErrors.category = "Category must be at least two character."
                    }
    
            }else{
                newErrors.category = "Category is required"
            }
        }

    setErrors(newErrors)
    return newErrors;
}