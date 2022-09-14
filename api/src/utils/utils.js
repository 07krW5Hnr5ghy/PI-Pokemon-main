function* idGenerator(){
    let seed = 1;
    while(seed){
        if(seed > 0){
            yield seed;
        }
        seed++;
    }
}

const keyGenerator = idGenerator();

module.exports = { keyGenerator };