function* idGenerator(){
    let seed = 1;
    while(seed){
        if(seed > 0 && seed < 10){
            yield "0" + seed + "c";
        }

        if(seed > 10){
            yield seed + "c";
        }

        seed++;
    }
}

const keyGenerator = idGenerator();

module.exports = { keyGenerator };