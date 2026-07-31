
export function validateCategory (categoryInput,setErrors) {
    
        const newErrors = {}

        const category = categoryInput.name.trim()

        if(category === ""){

            newErrors.category = "Category is required"
        }

        setErrors(newErrors)
        return newErrors;
    }