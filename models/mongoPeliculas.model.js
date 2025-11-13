const { Schema, model } = require('mongoose');

const PeliculaSchema = Schema({

    id: {
        type: String,
        //required: [true, 'El id es obligatorio'],
        //unique: true
    },
    
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    }

}, 
//Direccionamos el modelo a la Coleccion
{
    collection: 'Peliculas'  // Especificar el nombre de la colección
}
);

PeliculaSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Pelicula', PeliculaSchema);