import './Details.css';
import {useParams} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetail } from '../../redux/actions';

const Details = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDetail(id));
    },[dispatch]);

    let details = useSelector(state => state.reducerPokemon.pokemonDetail);

    console.log(details);
    return(
        <h1>Details</h1>
    );
}

export default Details;