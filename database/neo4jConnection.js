require('dotenv').config();
const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const session = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
    ).session({database:'neo4j'});

const dbConnectionNeo4j = async () => {
    // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
    const URI = process.env.NEO4J_URI
    const USER = process.env.NEO4J_USER
    const PASSWORD = process.env.NEO4J_PASSWORD


    let driver


    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))

    /*
    const session = driver.session();
    try {
        const result = await session.run('RETURN "Connection successful!" AS message');
        console.log(result.records[0].get('message'));
    } catch (error) {
        console.error('Connection error:', error);
    } finally {
        await session.close();
        await driver.close();
    }
    */    


    try {


        const serverInfo = await driver.getServerInfo()
        console.log('Connection established')
        console.log(serverInfo)
    } catch (err) {
        console.log(`Connection error\n${err}\nCause: ${err.cause}`)
        console.log(err);
    }

};


module.exports = {
    dbConnectionNeo4j,
    driver,
    session
}

/*
// Eliminar todos los nodos y relaciones
MATCH (n)
DETACH DELETE n;

// Eliminar índices y constraints existentes
DROP CONSTRAINT unique_ciudad_nombre IF EXISTS;
DROP CONSTRAINT unique_pais_nombre IF EXISTS;
DROP CONSTRAINT unique_persona_nombre IF EXISTS;
DROP CONSTRAINT unique_usuario_email IF EXISTS;

// CREACIÓN DE CONSTRAINTS

CREATE CONSTRAINT unique_ciudad_nombre IF NOT EXISTS FOR (c:Ciudad) REQUIRE c.nombre IS UNIQUE;
CREATE CONSTRAINT unique_persona_id IF NOT EXISTS FOR (p:Persona) REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT unique_pais_id IF NOT EXISTS FOR (pa:Pais) REQUIRE pa.id IS UNIQUE;
CREATE CONSTRAINT unique_usuario_email IF NOT EXISTS FOR (u:Usuario) REQUIRE u.email IS UNIQUE;

CREATE INDEX ciudad_poblacion IF NOT EXISTS FOR (c:Ciudad) ON (c.poblacion);
CREATE INDEX persona_tipo IF NOT EXISTS FOR (p:Persona) ON (p.tipo);
CREATE INDEX sitio_tipo IF NOT EXISTS FOR (s:Sitio) ON (s.tipo);

// CREACIÓN DE PAÍSES

CREATE (colombia:Pais {
  id: 'COL', 
  nombre: 'Colombia',
  poblacion: '51,52',
  continente: 'Sur América'
});

CREATE (australia:Pais {
  id: 'AUS',
  nombre: 'Australia',
  poblacion: '26,05',
  continente: 'Oceanía',
  capital: 'Canberra'
});
*/
