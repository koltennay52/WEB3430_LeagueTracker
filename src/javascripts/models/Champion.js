import mongoose from 'mongoose'

const Schema = mongoose.Schema; 

let championSchema = new Schema({
    id: {
        type: String,
        unique: true, 
        required: true
    },
    key: {
        type: String,
        unique: true, 
        required: true
    },
    name: {
        type: String,
        unique: true, 
        required: true
    },
    title: {
        type: String,
        unique: true, 
        required: true
    },
    blurb: {
        type: String,
        unique: true, 
        required: true
    }

})

export let Champion = mongoose.model('Champion', championSchema);