const {Pokemon, Type, Op} = require("../db");
const axios = require("axios");
const {keyGenerator} = require('../utils/utils');

// api calls 
const getPokemonsApi = async (pokemons) => {
    
    let pokeDb = await Pokemon.count({
        where:{custom:false}
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
        let types = [];
        
        for(let item of pokemon.types){
            types.push(item.type.name);
        }
        for(let item of pokemon.stats){
            if(item.stat.name === "hp") hp = item.base_stat;
            if(item.stat.name === "attack") attack = item.base_stat;
            if(item.stat.name === "defense") defense = item.base_stat;
            if(item.stat.name === "speed") speed = item.base_stat;
        }
        return {
            name:pokemon.name,
            id:pokemon.id < 10 ? "0" + pokemon.id + "a":pokemon.id.toString() + "a",
            classes:types,
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

const getPokemonId = async (id) => {

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
    },
    getDetail: async (req,res) => {
        let {id} = req.params;
        try{
            const pokemon = await Pokemon.findOne({
                where:{id:id}
            });
            res.json(pokemon);
        }catch(err){
            res.json({error:err.message});
        }
    },
    createPokemon: async (req,res) => {
        
        let {name,classes,hp,attack,defense,speed,height,weight,img} = req.body;
        try{
            await Pokemon.create({
                name,id:keyGenerator.next().value,classes,hp,attack,defense,speed,height,weight,img,
            });
            res.send("Pokemon created");
        }catch(err){
            res.send(err);
        }
    },
};