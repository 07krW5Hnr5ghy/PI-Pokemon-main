const {Pokemon, Type, Op} = require("../db");
const axios = require("axios");

// api calls 
const getPokemonsApi = async () => {
    //649 pokemons with img
    //https://pokeapi.co/api/v2/pokemon?offset=0&limit=649
    // img src https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/649.svg
    // https://pokeapi.co/api/v2/pokemon/1/
    const pokemonList = [];
    //console.log(pokemonList);
    for(let i = 1;i <= 20;i++){
        let info = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        pokemonList.push(info.data);
    }

    //console.log(pokemonList[0].stats.find(item => item.stat.name === "hp").base_stat);
    let pokeData = pokemonList.map((pokemon) => {
        let hp,attack,defense,speed;
        for(let item of pokemon.stats){
            if(item.stat.name === "hp") hp = item.base_stat;
            if(item.stat.name === "attack") attack = item.base_stat;
            if(item.stat.name === "defense") defense = item.base_stat;
            if(item.stat.name === "speed") speed = item.base_stat;
        }
        return {
            name:pokemon.name,
            hp:hp,
            attack:attack,
            defense:defense,
            speed:speed,
            height:pokemon.height,
            weight:pokemon.weight,
            img:pokemon.sprites.other.dream_world.front_default,
            custom:false,
        };
    });

    return pokeData;

};

// populate database
const fillDb = async (data) => {
    await Pokemon.bulkCreate(data);
};

module.exports = {
    // obtain all pokemons
    getPokemons: async (req,res)=>{
        try{
            const data = await getPokemonsApi();
            await fillDb(data);
            res.json(data);
        }catch(err){
            console.log(err);
            //res.json({error:err.message});
        }
        
    }
};