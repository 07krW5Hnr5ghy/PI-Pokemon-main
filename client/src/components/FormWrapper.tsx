import { ReactNode } from "react";

type FormWrapperProps = {
    title:string,
    children:ReactNode
}

const FormWrapper = ({title,children}:FormWrapperProps) => {
    return(
        <>
            <h2 className="wrapper-title">
                {title}
            </h2>
            <div className="wrapper-container">
                {children}
            </div>
        </>
    );
}

export default FormWrapper;