const {Pokemon, Type, Op} = require("../db");
const axios = require("axios");

// api calls 
const getPokemonsApi = async (pokemons) => {
    //649 pokemons with img
    //https://pokeapi.co/api/v2/pokemon?offset=0&limit=649
    // img src https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/649.svg
    // https://pokeapi.co/api/v2/pokemon/1/
    
    const pokemonList = [];
    //console.log(pokemonList);
    for(let i = 1;i <= pokemons;i++){
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


module.exports = {
    // obtain all pokemons
    getPokemons: async (req,res)=>{
        const {name} = req.query;
        const checkDb = await Pokemon.count({
            col:'name',
        });
    
        if(checkDb == 0){
            const data = await getPokemonsApi(100);
            await Pokemon.bulkCreate(data);
        }
        

        if(name){
            try{
                const filteredRecords = await Pokemon.findAll({
                    where:{
                        name:name,
                    }
                });
                res.json(filteredRecords.length > 0 ?filteredRecords:"Pokemon not found");
            }catch(err){
                res.json({error:err.message});
            }
        }else{
            try{
                const dbRecords = await Pokemon.findAll();
                res.json(dbRecords.length > 0 ? dbRecords : "Not pokemons created");
            }catch(err){
                //console.log(err);
                res.json({error:err.message});
            }
        }
        
        
    }
};