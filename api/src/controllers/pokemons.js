const {Pokemon, Type, Op} = require("../db");
const axios = require("axios");
const {keyGenerator} = require('../utils/utils');

// api calls 
const getPokemonsApi = async (pokemons) => {
    
    // store data of api pokemons
    const pokemonList = [];
    
    // make calls for each pokemon to get data from api
    for(let i = 1;i <= pokemons;i++){
        let info = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        pokemonList.push(info.data);
    }

    // map the pokemon data into objects with the nedeed info
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
            origin:"api+",
        };
    });

    // insert pokemons in database
    await Pokemon.bulkCreate(pokeData);
};

const getTypesApi = async () => {

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
    let typesName = types.data.results.map(type => {
        return {
            name:type.name,
        }
    });

    // insert types in database
    await Type.bulkCreate(typesName);
}

module.exports = {
    // obtain api pokemons
    getPokemons: async (req,res)=>{
        const {name} = req.query;

        let pokeDb = await Pokemon.count({
            where:{origin:"api+"}
        });
    
        if(pokeDb == 0){
            await getPokemonsApi(50);            
        }

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
        let id = await keyGenerator.next();
        try{
            await Pokemon.create({
                name,id:id.value,classes,hp,attack,defense,speed,height,weight,img,
            });
            res.send("Pokemon created");
        }catch(err){
            res.send(err);
        }
    },deletePokemon: async (req,res) => {
        let {id} = req.params;

        try{
            if(/^[0-9]{2}c$/.test(id)){

                await Pokemon.destroy({
                    where:{id:id}
                });

                res.send("Pokemon deleted");

            }else if(/^[0-9]{2}a$/.test(id)){

                res.send("Can't delete Pokemon from api");

            }else{

                res.send("Pokemon not found");

            }  
        }catch(err){

            res.send(err);
            
        }
    },updatePokemon: async (req,res) => {
        
        let {classes,hp,attack,defense,speed,height,weight,img,id} = req.body;
        
        try{
            if(/^[0-9]{2}c$/.test(id)){
                await Pokemon.update(
                    {
                        classes:classes,
                        hp:hp,
                        attack:attack,
                        defense:defense,
                        speed:speed,
                        height:height,
                        weight:weight,
                        img:img,
                    },
                    {
                        where: {id:id},
                    }
                );
                res.send("Pokemon updated");
            }else if(/^[0-9]{2}a$/.test(id)){
                res.send("Can't update Pokemon from api");
            }else{
                res.send("Pokemon not found");
            }
        }catch(err){
            res.send(err);
        }
    },uploadImg: async (req,res) => {
        const newpath = __dirname + "/images/";
        const file = req.files.file;
        const filename = file.name;

        file.mv(`${newpath}${filename}`,(err) => {
            if(err){
                res.status(500).send({message: "File upload failed",code: 200 });
            }else{
                res.status(200).send({message:"File Uploaded", code:200});
            }
        });
    }
};