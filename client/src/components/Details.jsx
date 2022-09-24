import {useParams, Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetail } from "../redux/actions/index";
import Loading from "./Loading";

const Details = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDetail(id));
    },[dispatch,id]);

    let detail = useSelector(state => state.reducerPokemon.pokemonDetail);
    console.log(detail);

    return(
        <>
            {Object.keys(detail).length ? <div id="Details_container">
                <h2>{`<${detail.name.charAt(0).toUpperCase() + detail.name.slice(1)}>`}</h2>
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
                    <button id="Details_button">Return</button>
                </Link>
            </div> : <Loading/>}
        </>
    );
}

export default Details;