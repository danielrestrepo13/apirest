const {driver} = require('../database/neo4jConnection');

//Pais Neo4j
const existePaisPorId = async (id) => {

    // Verificar si el correo existe
    //const existeMultimediaHeroe = await MultimediaHeroe.findById(id);
    //if (!existeMultimediaHeroe) {
    //  throw new Error(`El id no existe ${id}`);
    //}

    const session = driver.session();

    try {
        const result = await session.run(
        'MATCH (p:Pais {id: $id}) RETURN p',
        { id: id }
        );
    if (!result.records.length) {
        throw new Error(`El id no existe ${id}`);
    
    }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    } finally {
        await session.close();
    }


    };


    module.exports = {
        existePaisPorId
    };