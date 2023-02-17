import { FormWrapperProps } from "../tools/interfaces";

/* presentation container for form steps */
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