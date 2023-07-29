const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./src/models/data.json'));

async function persist() {
    return new Promise((res, rej) => {
        fs.writeFile('./src/models/data.json', JSON.stringify(data), (err) => {
            if (err == null) {
                res();
            } else {
                rej(err);
            }
        });
    });
}

function getAll(search) {
    let result = [];

    if(search.search){
        result = data.filter(e => e.name.toLowerCase().includes(search.search.toLowerCase()));
    }else if(search.from && search.to){
        if(result.length == 0){
            result = data.filter(e => Number(e.difficultyLevel) >= Number(search.from)
                                        &&  Number(e.difficultyLevel <= Number(search.to)));
        }else{
            result = result.filter(e => Number(e.difficultyLevel) >= Number(search.from)
                                        &&  Number(e.difficultyLevel <= Number(search.to)));
        }
    }else{
        return data;

    }
    return result;
}

function getById(id) {
    return data.find(c => c.id == id);
}
async function createCube(cubeData) {
    const cube = {
        name: cubeData.name,
        imageUrl: cubeData.imageUrl,
        description: cubeData.description,
        difficultyLevel: cubeData.difficultyLevel,
        id: generateId()
    }
    const missing = Object.entries(cube).filter(([k, v]) => !v);

    if (missing.length > 0) {
        throw new Error(missing.map(([k, v]) => `${k} is required!`).join('\n'))
    }

    data.push(cube);
    await persist();
    return cube;
}

function generateId() {
    return ('00000' + (Math.random() * 99999 | 0).toString(16)).slice(-6);
}

module.exports = {
    getAll,
    getById,
    createCube
}