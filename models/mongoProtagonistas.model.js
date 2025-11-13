const { Schema, model } = require('mongoose');

const ProtagonistaSchema = Schema({

    
    id: {
        type: String,
        //required: [true, 'El id es obligatorio'],
        //unique: true
    },
    
    papel: {
        type: String,
        required: [true, 'El papel es obligatorio'],
        //unique: true //modificado el 20-10-2025
    },
    fecha_participacion: {
        type: Date,
        required: [true, 'La fecha de participación es obligatoria'],
    },
    heroes_id: {
        type: Schema.Types.ObjectId,
        ref: 'Heroe',
        required: [true, 'El Id de Héroe es obligatorio'],
    },
    peliculas_id: {
        type: Schema.Types.ObjectId,
        ref: 'Pelicula',
        required: [true, 'Debe tener un Id de Película']
    }
}, 
//Direccionamos el modelo a la Coleccion
{
    collection: 'Protagonistas'  // Especificar el nombre de la colección
}
);

ProtagonistaSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Protagonista', ProtagonistaSchema);
