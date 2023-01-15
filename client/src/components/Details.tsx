import { useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,Link } from "react-router-dom";
import {RootState} from "../redux/store";
import { getDetail, resetDetail } from "../redux/pokemonActions";
import Loading from "./Loading";
import Chart from "./Chart";
import Nav from "./Nav";



const Detail = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {detail} = useSelector((state:RootState) => state.pokemons);

    useEffect(() => {
        if(detail.id && detail.id !== id){
            dispatch(resetDetail());
        }
        if(id && !detail.name){
            dispatch(getDetail(id));
        }
    },[dispatch,id,detail]);
    console.log(detail);

    const stats = [
        detail.attack,
        detail.defense,
        detail.hp,
        detail.speed,
        detail.specialAttack,
        detail.specialDefense
    ];
    console.log(stats);
    return(
        <div>
            <Nav/>
             {!Object.keys(detail).length ? 
             <Loading/> :
             <div className="detail-container">
                 <div className="basic-info">
                     <h1 className="name">{detail.name}</h1>
                     <span className="detail">{detail.id}</span>
                     <div className="img-container">
                        <img src={detail.img} alt="" loading="lazy"/>
                     </div>
                     <div className="types">
                        {detail.classes.map(type=><span className="detail-type" key={type}>{` ${type} `}</span>)}
                     </div>
                 </div>
                 <div className="stats">
                    <h3>Stats</h3>
                    <Chart/>
                 </div>
             </div>
             }
         </div>
    );
}

export default Detail;

{/* <div>
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
        </div> */}