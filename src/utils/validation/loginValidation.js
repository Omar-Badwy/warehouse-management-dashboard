

export function validateLogin (userInput,setErrors,user) {
        
    const newErrors = {}

    const { name, email, password} = userInput
    
    if(name !== ""){

        if(name !== user.name) {
            newErrors.name = "The entered name is incorrect."
        }

    }else{
        newErrors.name = "Name is required"
    }
    
    if (email === "") {
        newErrors.email = "Email is required";

    } 
    else if (email !== user.email) {
        newErrors.email = "The entered email is incorrect.";
    }

    if(password !== ""){

        if(password !== user.password) {
            newErrors.password = "The entered password is incorrect."
        }

    }else{
        newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return newErrors;
}