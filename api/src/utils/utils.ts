// //const {Pokemon} = require('../db');
// import Pokemon from '../models/Pokemon';
// async function* idGenerator(){
//     let lastId = await Pokemon.count({
//         where:{origin:"custom+"}
//     });
//     let seed = lastId + 1;
//     while(seed){
//         if(seed > 0 && seed < 10){
//             yield "0" + seed + "c";
//         }

//         if(seed > 10){
//             yield seed + "c";
//         }

//         seed++;
//     }
// }

// export const keyGenerator = idGenerator();