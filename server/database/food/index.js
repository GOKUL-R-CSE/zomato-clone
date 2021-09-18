import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema( {
    name: { type: String, required: false },
    descript: { type: String, required: false },
    isVeg: { type: Boolean, required: true },
    isContainsEgg: { type: Boolean, required: true },
    category: { type: String, required: false },
    photos: {
        type: mongoose.Types.ObjectId,
        ref: "Images",
    },
    price: { type: Number, default: 150, required: true },
    addOns: [ {
        type: mongoose.Types.ObjectId,
       rel: "Foods" 
    } ],
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: "Restaurants",
        required: true,
    },
}, {
    timestamps: true,
} );

export const FoodModel = mongoose.model( "Foods", FoodSchema );