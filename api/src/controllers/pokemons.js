const {Pokemon, Type, Op} = require("../db");
const axios = require("axios");

// api calls 
const getPokemonsApi = async (pokemons) => {
    
    let pokeDb = await Pokemon.count({
        col:'name',
    });

    if(pokeDb > 0){
        return;
    }
    
    const pokemonList = [];
    
    for(let i = 1;i <= pokemons;i++){
        let info = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        pokemonList.push(info.data);
    }

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

    await Pokemon.bulkCreate(pokeData);

};

const getTypesApi = async () => {

    let typeDb = await Type.count({
        col:'name',
    });

    if(typeDb > 0){
        return;
    }

    let types = await axios.get(`https://pokeapi.co/api/v2/type`);
    //console.log(types.data.results.map(type => type.name));
    let typesName = types.data.results.map(type => {
        return {
            name:type.name,
        }
    });

    await Type.bulkCreate(typesName);
}


module.exports = {
    // obtain all pokemons
    getPokemons: async (req,res)=>{
        const {name} = req.query;

        await getPokemonsApi(10);
        await getTypesApi();       

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
        
        
    },
    getTypes: async (req,res) => {
        await getTypesApi();

        try{
            const types = await Type.findAll();
            res.json(types.length > 0 ? types : "Not types retrieved");
        }catch(err){
            res.json({error:err.message});
        }
    }
};