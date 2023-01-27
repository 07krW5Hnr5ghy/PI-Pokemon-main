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
                    <Chart/>
                 </div>
             </div>
             }
             <div className="detail-back">
                <Link to={"/pokemons"}>
                    <button className="back-button" onClick={() => dispatch(resetDetail())}>Return</button>
                </Link>
             </div>
         </div>
    );
}

export default Detail;