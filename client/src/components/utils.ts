// validate create
// export const validate = (input : {
//     name: string;
//     id:string;
//     classes:string[];
//     img:string;
// },pokemons,mode : string) => {
//     let errors = {};

//     if(mode === "create"){
//         if(!input.name){
//             errors.name = 'Please write a name for the new pokemon';
//         }else if(!/^[A-Za-z]+$/.test(input.name) || input.name.length > 10){
//             errors.name = 'Name is invalid enter alphabet characters only and 10 Characters as maximum';
//         }else if(pokemons.find(pokemon => pokemon.name === input.name)){
//             errors.name = 'Name already exists in the pokemons list';
//         }else{
//             errors.name = "is valid";
//         }
//     }

//     if(mode === "update"){
//         if(!input.id){
//             errors.id = "Please write a id of a created pokemon";
//         }else if(/^[0-9]{2}a$/.test(input.id)){
//             errors.id = "Can't update a pokemon from the api";
//         }else if(/^[0-9]{2}c$/.test(input.id)){
//             if(pokemons.find(pokemon => pokemon.id === input.id)){
//                 errors.id = "is valid";
//             }else{
//                 errors.id = "Not existing id";
//             }
//         }else{
//             errors.id = "invalid id";
//         }
//     }

//     if(!input.classes.length){
//         errors.classes = 'Select at least one type to create pokemon';
//     }else if(input.classes.length > 2){
//         errors.classes = "Maximum two types allowed";
//     }else{
//         errors.classes = "is valid";
//     }

//     let stats = ["attack","hp","defense","speed","height","weight"];

//     for(let stat of stats){
//         if(!/^[0-9]+$/.test(input[stat]) || input[stat] <= 0){
//             errors[stat] = `${stat} is invalid please input a number greather than zero in this field`;
//         }else{
//             errors[stat] = "is valid";
//         }
//     }

//     if(!input.img){
//         errors.img = 'url of image is required';
//     }else if(!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|svg|png|webp|jpeg)/.test(input.img)){
//         errors.img = 'input a valid image url of a file of the extensions jpg,svg,png,jpeg or webp';
//     }else{
//         errors.img = "is valid";
//     }

//     return errors;
// }

export const utils : string = "utils";