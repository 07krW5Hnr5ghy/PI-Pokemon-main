import express,{Express,Request,Response,NextFunction} from 'express';
import Pokemon from '../models/Pokemon';
import Type from '../models/Type';
import {keyGenerator} from '../utils/utils';
import {getApiData, getApiTypes} from './apiGetters';
import { getErrorMessage } from '../utils/errHandler';

export const fetchPokemons = async (req:Request,res:Response) => {
    
    try{
        const {name} = req.query;

        let pokeDb = await Pokemon.count({
            where:{origin:"api+"}
        });

        if(pokeDb == 0){
            await getApiData(50);
        }

        if(name){
            const filteredRecords = await Pokemon.findAll({
                where:{
                    name:name,
                }
            });
            res.json(filteredRecords.length > 0 ?filteredRecords:"Pokemon not found");
        }else{
            const dbRecords = await Pokemon.findAll();
            res.json(dbRecords.length > 0 ? dbRecords : "Not pokemons created");
        }
    }catch(err){
        res.json({error:getErrorMessage(err)});
    }


}

export const fetchTypes = async (req:Request,res:Response) => {
    try{
        await getApiTypes();

        const types = await Type.findAll();
        res.json(types.length > 0 ? types : "Not types retrieved");
    }catch(err){
        res.json({error:getErrorMessage(err)});
    }
}

export const fetchDetail = async (req:Request,res:Response) => {
    try{
        let {id} = req.params;
        const pokemon = await Pokemon.findOne({
            where:{id:id}
        });
        res.json(pokemon);
    }catch(err){
        res.json({error:getErrorMessage(err)});
    }
}

export const createPokemon = async (req:Request,res:Response) => {
    try{
        let {name,classes,hp,attack,defense,speed,height,weight,img} = req.body;
        let id = await keyGenerator.next();
        await Pokemon.create({
            name,id:id.value,classes,hp,attack,defense,speed,height,weight,img,
        });
        res.send("Pokemon created");
    }catch(err){
        res.json({error:getErrorMessage(err)});
    }
}

export const deletePokemon = async (req:Request,res:Response) => {
    try{
        let {id} = req.params;
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
        res.json({error:getErrorMessage(err)});
    }
}

export const updatePokemon = async (req:Request,res:Response) => {
    try{
        let {classes,hp,attack,defense,speed,height,weight,img,id} = req.body;

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
        res.json({error:getErrorMessage(err)});
    }
}