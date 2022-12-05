import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        navigate("/pokemons");
    },[navigate]);

    return(
        <div id="NotFound_container">
            <div id="NotFound_message">
                <h1>Page not found</h1>
                <p>you will be redirect to home page</p>
            </div>
        </div>
    );
}

export default NotFound;