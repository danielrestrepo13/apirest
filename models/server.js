const express = require('express')
const cors = require('cors')

const { bdmysql,bdmysqlNube } = require('../database/mySqlConnection');
const { dbConnectionMongo } = require('../database/mongoConnection');

const { dbConnectionNeo4j } = require('../database/neo4jConnection');


class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        
        this.pathsMySql = {
            auth: '/api/auth',
            prueba: '/api/prueba',

            //PATH heroes
            heroes: '/api/heroes',

            //PATH usuarios
            usuarios: '/api/usuarios',

            //PATH peliculas
            peliculas: '/api/peliculas',

            //PATH protagonistas
            protagonistas: '/api/protagonistas',

            //PATH multimedias
            multimedias: '/api/multimedias',

            //PATH multimedias_heroe
            multimediasHeroe: '/api/multimediasHeroe',


        }
        
        this.pathsMyMongo = {
            //PATH heroes
            heroes: '/api/heroesm',
            //PATH peliculas
            peliculas: '/api/peliculasm',
            //PATH protagonistas
            protagonistas: '/api/protagonistasm'
        }

        this.pathsNeo = {
            //Ajusto la url para la outorizacion por login
            personas: '/api/personas',
            //usuarios: '/api/usuarios',
            //heroes:'/api/heroes',            
            //multimedias:'/api/multimedias',
            //multimediasheroe:'/api/multimediasheroe',
            //grupomultimedias:'/api/grupomultimedias',

        }
        


        this.app.get('/', function (req, res) {
            res.send('Hola Mundo a todos desde la Clase...')
        })

        //Aqui me conecto a la BD MySQL
        this.dbConnection();

        //Aqui me conecto a la BD Mongo
        this.conectarBDMongo();

        //Aqui me conecto a la Neo4j
        this.conectarBDNeo4j()


        //Middlewares
        this.middlewares();

        //Routes
        this.routes();

    }


    async dbConnection() {
        try {
            await bdmysqlNube.authenticate();
            console.log('Connection OK a MySQL.');
        } catch (error) {
            console.error('No se pudo Conectar a la BD MySQL', error);
        }
    }

    async conectarBDMongo(){
        await dbConnectionMongo();
    }

    async conectarBDNeo4j(){
        await dbConnectionNeo4j()
    }


    routes() {

        //Aqui activo la ruta de HEROES para MY SQL
        this.app.use(this.pathsMySql.heroes, require('../routes/heroes.route'));

        //Aqui activo la ruta de USUARIOS
        this.app.use(this.pathsMySql.usuarios, require('../routes/usuarios.route'));

        //Aqui activo la ruta de PELICULAS
        this.app.use(this.pathsMySql.peliculas, require('../routes/peliculas.route'));

        //Aqui activo la ruta de PROTAGONISTAS
        this.app.use(this.pathsMySql.protagonistas, require('../routes/protagonistas.route'));

        //Aqui activo la ruta de MULTIMEDIAS
        this.app.use(this.pathsMySql.multimedias, require('../routes/multimedias.route'));

        //Aqui activo la ruta de MULTIMEDIAS HEROE
        this.app.use(this.pathsMySql.multimediasHeroe, require('../routes/multimediasHeroe.route'));

        // PARA MONGO:
        
        //Aqui activo la ruta de MONGO HEROES
        this.app.use(this.pathsMyMongo.heroes, require('../routes/heroes.mongo.route'));

        //Aqui activo la ruta de MONGO PELICULAS
        this.app.use(this.pathsMyMongo.peliculas, require('../routes/peliculas.mongo.route'));

        //Aqui activo la ruta de MONGO PROTAGONISTAS
        this.app.use(this.pathsMyMongo.protagonistas, require('../routes/protagonistas.mongo.route'));


        // PARA NEO4J:

        this.app.use(this.pathsNeo.personas, require('../routes/personaNeo.route'));


    }


    middlewares() {
        //CORS
        //Evitar errores por Cors Domain Access
        //Usado para evitar errores.
        this.app.use(cors());

        //Lectura y Parseo del body
        //JSON

        //JSON (JavaScript Object Notation)
        //es un formato ligero de intercambio de datos.
        //JSON es de fácil lectura y escritura para los usuarios.
        //JSON es fácil de analizar y generar por parte de las máquinas.
        //JSON se basa en un subconjunto del lenguaje de programación JavaScript,
        //Estándar ECMA-262 3a Edición - Diciembre de 1999.

        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

    }
    

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


module.exports = Server;