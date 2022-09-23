import {useParams} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetail } from '../redux/actions';
import Nav from "./Nav";

const Details = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDetail(id));
    },[dispatch,id]);

    let detail = useSelector(state => state.reducerPokemon.pokemonDetail);

    console.log(detail);
    let displayName = detail.name.split("");
    displayName[0] = detail.name[0].toUpperCase();
    displayName = displayName.join("");

    return(
        <>
            <Nav/>
            <div id="Details_container">
                <h2>{`<${displayName}>`}</h2>
                <span>{detail.id}</span>
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
            </div>
        </>
    );
}

export default Details;