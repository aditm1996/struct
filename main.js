const fs = require('fs')

const getJson = fileName => JSON.parse(fs.readFileSync(fileName, 'utf-8'))

const json = getJson("./struct.json")

function traverse(obj, currentDirectory) {
    for (let key in obj) {
        let value = obj[key];

        if (typeof value == "string" && value.endsWith('/')) {
          currentDirectory += value;
          obj[key] = value = getJson(currentDirectory + '.struct.json');
        }

        if (value !== null && typeof value == "object") {
          // if value is object then traverse recursively
          traverse(obj[key], currentDirectory);
        } else {
          console.log(`${key}: ${value}`)
        }
    }
}

// console.log(json)
traverse(json, './')
console.log(json)
