/* libraries */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/* functions and definitions */
import {RootState} from "../redux/store";
import { getDetail, resetDetail,removePokemon } from "../redux/pokemonActions";
import { showSuccessMessage } from "../tools/tools";

/* components */
import Loading from "./Loading";
import Chart from "./Chart";
import Nav from "./Nav";


/* component that renders the page with the all available data of a pokemon */
const Detail = () => {
    
    /* get pokemon id from the details page url */
    const {id} = useParams();
    /* get detail info about pokemon from redux state */
    const {detail} = useSelector((state:RootState) => state.pokemons);
    /* instances of useDispatch and use Navigate hooks */
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        
        /* reset detail state if the 
        data is not correct with the url id */
        if(detail.id && detail.id !== id){
            dispatch(resetDetail());
        }
        
        /* set detail info if the detail state
        is empty */
        if(id && !detail.name){
            dispatch(getDetail(id));
        }

    },[dispatch,id,detail]);

    /* store pokemon stats info to use in detail page chart */
    const stats = [
        {
            subject:'Special Attack',
            points:detail.specialAttack,
        },
        {
            subject:'Defense',
            points:detail.defense,
        },
        {
            subject:'Attack',
            points:detail.attack,
        },
        {
            subject:'Special Defense',
            points:detail.specialDefense,
        },
        {
            subject:'Health',
            points:detail.health,
        },
        {
            subject:'Speed',
            points:detail.speed,
        }
    ];

    return(
        <div>
            <Nav/>
            {/* show loader if detail state is empty */}
            {!Object.keys(detail).length ? 
            <Loading/> :
            <div className="detail-container">
                <div className="basic-info">
                    <h1 className="detail-name">{detail.name}</h1>
                    <span className="detail-id">{detail.id}</span>
                    <div className="img-container">
                        <img src={detail.picture} alt="" loading="lazy"/>
                    </div>
                    <div className="types">
                        {detail.classes.map(type=><span className="detail-type" key={type}>{` ${type} `}</span>)}
                    </div>
                </div>
                <div className="stats">
                    <h2>Stats</h2>
                    <Chart stats={stats}/>
                </div>
             </div>
            }
            {/* render delete and edit button for pokemon that 
            was created by the user */}
            {!/^[0-9]*c$/.test(detail.id) ? null : 
                <div className="detail-actions">
                    <Link to={`/update/${detail.id}`}>
                        <button className="pokemon-edit back-button">Edit</button>
                    </Link>
                    <button className="pokemon-delete back-button" onClick={() => {

                        dispatch(removePokemon(detail.id));

                        setTimeout(() => {
                            showSuccessMessage(`Pokemon ${detail.name} deleted successfully`)
                        },5000);

                        navigate("/pokemons");

                    }}>Delete</button>
                </div>
            }
            <div className="detail-back">
                <Link to={"/pokemons"}>
                    <button className="back-button" onClick={() => dispatch(resetDetail())}>Return</button>
                </Link>
            </div>
            <ToastContainer/>
         </div>
    );
}

export default Detail;