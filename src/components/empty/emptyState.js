import { Button } from "@mantine/core";
 
export default function EmptyState ({icon,title,description,buttonText,onClick}) {


    return(
        <>
            <div style={{display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                gap:"10px",
                padding:"20px",
                fontSize:"20px",
                color:"black",
                width:"100%"
            }}>
                <p>{icon} {title}</p>
                <p>{description}</p>
                {buttonText ? 
                <Button onClick={onClick} style={{backgroundColor:"#0062ff"}}>{buttonText}</Button>
                : ""}
            </div>
        </>
    )
}