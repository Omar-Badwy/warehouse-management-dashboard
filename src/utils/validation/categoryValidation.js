
export function validateCategory (inputValue,setErrors) {
    
        const newErrors = {}

        const category = inputValue.category.trim()

        if(category === ""){

            newErrors.category = "Category is required"
        }

        setErrors(newErrors)
        return newErrors;
    }