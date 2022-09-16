import "./Pokemon.css";

const Pokemon = (props) => {
    let {name,img,classes} = props;
    return(
        <div>
            <h2>{name}</h2>
            <img src={img} alt={name}/>
            {classes.map(type => <p>{type}</p>)}
        </div>
    );
}

export default Pokemon;