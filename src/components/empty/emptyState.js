import { Button } from "@mantine/core";
import { ThemeContext } from "../../providers/themeProvider";
import { useContext } from "react";
 
export default function EmptyState ({icon,title,description,buttonText,onClick}) {

    const {mode} =  useContext(ThemeContext)

    return(
        <>
            <div style={{display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                gap:"10px",
                padding:"20px",
                fontSize:"20px",
                color: mode === "ligth" ? "black" : "white",
                width:"100%"
            }}>
                <p>{icon} {title}</p>
                <p>{description}</p>
                {buttonText ? 
                <Button onClick={onClick} style={{backgroundColor:"var(--button-add-primary)"}}>{buttonText}</Button>
                : ""}
            </div>
        </>
    )
}