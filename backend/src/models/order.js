const mongoose = require("mongoose");

const shippingAddressSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    streetAddress:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    zipcode:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    }
})

const orderSchema = new mongoose.Schema({
    user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique:true
        },
        clerkId:{
            type:String,
            required:true,
            unique:true
        },
        orderItems:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                }, 
                name:{
                    type:String,
                    required:true
                },
                price:{
                    type:Number,
                    required:true,
                    min:0,
                },
                quantity:{
                    type:Number,
                    required:true,
                    min:1,
                    default:1
                },
                image:{
                    type:String,
                    required:true
                }
            }
        ],
        shippingAddress:{
            type:shippingAddressSchema,
            required:true,
        },
        paymentResult:{
            id:String,
            status:String,
        },
        totalPrice:{
            type:Number,
            required:true,
            min:0
        },
        status:{
            type:String,
            enum:["pending","shipped","delivered"],
            default:"pending",
        },
        deliveredAt:{
            type:Date
        }


},{timestamps:true});

module.exports =  mongoose.model("Order", orderSchema);