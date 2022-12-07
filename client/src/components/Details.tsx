import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,Link } from "react-router-dom";
import {RootState} from "../redux/store";
import { getDetail, resetDetail } from "../redux/pokemonActions";
import Loading from "./Loading";

const Detail = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    const {detail} = useSelector((state:RootState) => state.pokemons);

    useEffect(() => {
        if(id && !Object.keys(detail).length){
            dispatch(getDetail(id));
        }
    },[dispatch,id,detail]);

    

    return(
        <div>
            {!Object.keys(detail).length ? <Loading/> :
            <div id="Details_container">
                <h2>{`< ${detail.name.charAt(0).toUpperCase() + detail.name.slice(1)} >`}</h2>
                <span id="Details_id">{detail.id}</span>
                <img src={detail.img} alt={detail.name}/>
                <div id="Details_types">
                    {detail.classes.map(type => <span key={type}>{` ${type} `}</span>)}
                </div>
                <div id="Details_stats">
                    <span>health: {detail.hp}</span>
                    <span>attack: {detail.attack}</span>
                    <span>speed: {detail.speed}</span>
                    <span>height: {detail.height}</span>
                    <span>weight: {detail.weight}</span>
                </div>
                <Link to={"/pokemons"}>
                    <button id="Details_button" onClick={() => dispatch(resetDetail())}>Return</button>
                </Link>
            </div>
            }
        </div>
    );
}

export default Detail;