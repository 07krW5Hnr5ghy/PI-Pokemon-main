import axios from "axios";

export const getApiPokemons = async (limit: number) => {
    
    // store data of api pokemons
    const pokemonsList = [];

    // make calls for each pokemon to get data from api
    for(let i = 1; i <= limit;i++){
        let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        pokemonsList.push(pokemon.data);
    }

    // map the pokemon data into objects with the needed properties
    let data = pokemonsList.map((pokemon) => {
        let health,attack,defense,speed,specialAttack,specialDefense;
        let types = [];

        for(let item of pokemon.types){
            types.push(item.type.name);
        }

        for(let item of pokemon.stats){
            if(item.stat.name === "hp") health = item.base_stat;
            if(item.stat.name === "attack") attack = item.base_stat;
            if(item.stat.name === "defense") defense = item.base_stat;
            if(item.stat.name === "speed") speed = item.base_stat;
            if(item.stat.name === "special-attack") specialAttack = item.base_stat;
            if(item.stat.name === "special-defense") specialDefense = item.base_stat; 
        }

        return{
            name:pokemon.name,
            id:pokemon.id < 10 ? "0" + pokemon.id + "a":pokemon.id.toString() + "a",
            classes:types,
            health,
            attack,
            defense,
            speed,
            specialAttack,
            specialDefense,
            picture:pokemon.sprites.other.dream_world.front_default,
        }
    });

    return data;
}

export const getApiTypes = async () => {

    // make call to the api to get types
    let types = await axios.get(`https://pokeapi.co/api/v2/type`);

    // map the data into objects with the type name
    let typesNames = types.data.results.map((type: {name:string}) => {
        return { type:type.name }
    });

    return typesNames;
}