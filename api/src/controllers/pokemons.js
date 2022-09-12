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
    for(let i = 1;i < 20;i++){
        let info = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        pokemonList.push(info.data);
    }

    return pokemonList;
};

module.exports = {
    // obtain all pokemons
    getPokemonsApi: async (req,res)=>{
        try{
            const data = await getPokemonsApi();
            res.json(data);
        }catch(err){
            //console.log(err);
            res.json({error:err.message});
        }
        
    }
};