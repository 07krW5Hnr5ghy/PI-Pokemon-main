import Pokemon from '../models/Pokemon';
import Type from '../models/Type';
import axios from 'axios';

export const getApiData = async (limit: number) => {
    
    // store data of api pokemons
    const pokemonList = [];
    
    // make calls for each pokemon to get data from api
    for(let i = 1;i <= limit;i++){
        let info = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        pokemonList.push(info.data);
    }

    // map the pokemon data into objects with the nedeed info
    let pokeData = pokemonList.map((pokemon) => {
        let hp,attack,defense,speed,specialAttack,specialDefense;
        let types = [];
            
        for(let item of pokemon.types){
            types.push(item.type.name);
        }

        for(let item of pokemon.stats){
            if(item.stat.name === "hp") hp = item.base_stat;
            if(item.stat.name === "attack") attack = item.base_stat;
            if(item.stat.name === "defense") defense = item.base_stat;
            if(item.stat.name === "speed") speed = item.base_stat;
            if(item.stat.name === "special-attack") specialAttack = item.base_stat;
            if(item.stat.name === "special-defense") specialDefense = item.base_stat;
        }

        return {
            name:pokemon.name,
            id:pokemon.id < 10 ? "0" + pokemon.id + "a":pokemon.id.toString() + "a",
            classes:types,
            hp:hp,
            attack:attack,
            defense:defense,
            speed:speed,
            specialAttack:specialAttack,
            specialDefense:specialDefense,
            img:pokemon.sprites.other.dream_world.front_default,
            origin:"api+",
        };
    });

    // insert pokemons in database
    await Pokemon.bulkCreate(pokeData);
};

export const getApiTypes = async () => {

    // check if the types are in the database
    let typeDb = await Type.count({
        col:'name',
    });

    if(typeDb > 0){
        return;
    }

    // make call to the api to get types
    let types = await axios.get(`https://pokeapi.co/api/v2/type`);
    
    // map the data into objects with the type name
    let typesName = types.data.results.map((type : { name:string } ) => {
        return {
            name:type.name,
        }
    });

    // insert types in database
    await Type.bulkCreate(typesName);
}

