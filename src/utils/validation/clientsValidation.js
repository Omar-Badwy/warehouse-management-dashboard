

export function validateClient (clientInput,setErrors) {
        
        const newErrors = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const { name, phone, email, address} = clientInput
        
        if(name !== ""){

            if(name.length < 2) {
                newErrors.name = "Name must be at least 2 characters."
            }

        }else{
            newErrors.name = "Name is required"
        }
        
        if(phone === ""){
            newErrors.phone = "phone is required"

        }else 
            if (!/^\d+$/.test(phone)) {
            newErrors.phone = "Phone must contain numbers only.";
        } else 
            if (phone.length !== 11) {
            newErrors.phone = "Phone must be 11 digits.";
        }
        

        if (email === "") {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email";
        }


        if (address === "") {
            newErrors.address = "Address is required";
        } else
            if (address.length < 3) {
                newErrors.address = "Address is too short";
            }

        setErrors(newErrors)
        return newErrors;
    }