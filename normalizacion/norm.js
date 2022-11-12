import { normalize, schema, denormalize } from "normalizr";
import fs from 'fs';
import util from 'util';


//const file = fs.readFileSync('holding.json', 'utf-8', 'r');

const originalData = {
  "id": "2940",
  "empresas": [
    {
      "id": "2940",
      "nombre": "Pokecommerce",
      "gerente": {
        "id": "2",
        "nombre": "Stephen L",
        "apellido": "Fernandes",
        "DNI": "61848203",
        "direccion": "255 Delaware Avenue",
        "telefono": "415-268-6877"
      },
      "encargado": {
        "id": "3",
        "nombre": "Carol",
        "apellido": "Bachman",
        "DNI": "136062392",
        "direccion": "255 Delaware Avenue",
        "telefono": "415-268-6800"
      },
      "empleados": [
        {
          "id": "1",
          "nombre": "Nicole",
          "apellido": "Earp",
          "DNI": "47638298",
          "direccion": "255 Delaware Avenue",
          "telefono": "415-268-6807"
        },
        {
          "id": "2",
          "nombre": "Fred",
          "apellido": "Ash",
          "DNI": "6294701492",
          "direccion": "255 Delaware Avenue",
          "telefono": "415-268-6800"
        },
        {
          "id": "3",
          "nombre": "Douglas",
          "apellido": "Cochran",
          "DNI": "4609502345",
          "direccion": "255 Delaware Avenue",
          "telefono": "415-268-6800"
        },
        {
          "id": "4",
          "nombre": "Clarissa",
          "apellido": "McCoy",
          "DNI": "482036436",
          "direccion": "255 Delaware Avenue",
          "telefono": "415-268-6800"
        },
        {
          "id": "5",
          "nombre": "Sarah",
          "apellido": "Roark",
          "DNI": "43598623",
          "direccion": "255 Delaware Avenue",
          "telefono": "415-268-6800"
        },
        {
          "id": "6",
          "nombre": "Marcus",
          "apellido": "Busse",
          "DNI": "",
          "direccion": "255 Delaware Avenue",
          "telefono": "415-268-6800"
        },
        {
          "id": "7",
          "nombre": "Muriel",
          "apellido": "Brooks",
          "DNI": "38480235",
          "direccion": "255 Delaware Avenue",
          "telefono": "415-268-6800"
        }
      ]
    },
    {
      "id": "2941",
      "nombre": "Pokecommerce2",
      "gerente": {
        "id": "7",
        "nombre": "Muriel",
        "apellido": "Brooks",
        "DNI": "38480235",
        "direccion": "255 Delaware Avenue",
        "telefono": "415-268-6800"
      },
      "encargado": {
        "id": "5",
        "nombre": "Sarah",
        "apellido": "Roark",
        "DNI": "43598623",
        "direccion": "255 Delaware Avenue",
        "telefono": "415-268-6800"
      },
      "empleados": [
        {
          "id": "1",
          "nombre": "Nicole",
          "apellido": "Earp",
          "DNI": "47638298",
          "direccion": "255 Delaware Avenue",
          "telefono": "415-268-6807"
        },
        {
          "id": "2",
          "nombre": "Fred",
          "apellido": "Ash",
          "DNI": "6294701492",
          "direccion": "255 Delaware Avenue",
          "telefono": "415-268-6800"
        },
        {
          "id": "3",
          "nombre": "Douglas",
          "apellido": "Cochran",
          "DNI": "4609502345",
          "direccion": "255 Delaware Avenue",
          "telefono": "415-268-6800"
        },
        {
          "id": "4",
          "nombre": "Clarissa",
          "apellido": "McCoy",
          "DNI": "482036436",
          "direccion": "255 Delaware Avenue",
          "telefono": "415-268-6800"
        },
        {
          "id": "6",
          "nombre": "Marcus",
          "apellido": "Busse",
          "DNI": "",
          "direccion": "255 Delaware Avenue",
          "telefono": "415-268-6800"
        }
      ]
    }
  ]
}
  
  
const persona = new schema.Entity('personas');

const gerente = new schema.Entity('gerentes', {
    gerente: persona
})

const encargado = new schema.Entity('encargados', {
    encargado: persona
})

const empleado = new schema.Entity('empleados', {
    empleados: [persona]
})

const empresa = new schema.Entity('empresas', {
    gerente: gerente,
    encargado: encargado,
    empleados: [empleado]
})

const empresasSchema = new schema.Entity('empresasSchema', {
    empresas: [empresa]
})

function print(data) {
    console.log(util.inspect(data, false, 12, true));
  }

console.log("1")
const dataNormalizada = normalize(originalData, empresasSchema);

//print(dataNormalizada);

const dataDesnormalizada = denormalize(dataNormalizada.result, empresasSchema, dataNormalizada.entities);

//print(dataDesnormalizada)

const originalLength = JSON.stringify(originalData).length
const normalizedLength = JSON.stringify(dataNormalizada).length
const compressedPercentage = 100 - (normalizedLength / originalLength) * 100;
console.log(`Se comprimió un: ${compressedPercentage} %`);

