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
    },[dispatch]);

    let detail = useSelector(state => state.reducerPokemon.pokemonDetail);

    console.log(detail);

    return(
        <>
            <Nav/>
            <h2>{detail.name}</h2>
            <p>id:{detail.id}</p>
            <img src={detail.img} alt={detail.name}/>
            <p>health:{detail.hp}</p>
            <p>attack:{detail.attack}</p>
            <p>speed:{detail.speed}</p>
            <p>height:{detail.height}</p>
            <p>weight:{detail.weight}</p>
        </>
    );
}

export default Details;