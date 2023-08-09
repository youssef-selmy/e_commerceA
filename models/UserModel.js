const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
    // const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name required'],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    bio:String,
    national_id_number:Number,
    national_id_pic:String,
    national_id_pic_with_user_face:String,
    products:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Products',
    }, ], // products id
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        lowercase: true,
    },
    phone:String,
    profileImg: String,
    ban:{
        type:Boolean,
         default:false,
        },
    favorites: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Products',
        }, ], // products id
    cart: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Products',
        }, ], // products id

        valid_seller:{
            type:Boolean,
            default:false,
        },

    password: {
        type: String,
        required: [true, 'password required'],
        minlength: [6, 'Too short password'],
    },
    passwordChangedAt: Date,
    // passwordResetCode: String,
    // passwordResetExpires: Date,
    // passwordResetVerified: Boolean,
    role: {
        type: String,
        enum: ['user', 'seller', 'admin'],
        default: 'user',
    },
    active: {
        type: Boolean,
        default: true,
    },
    // isAdmin: {
    //     type: Boolean,
    //     default: false,
    // },
    // child reference (one to many)
    // wishlist: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Product',
    // }, ],
    // addresses: [{
    //     id: { type: mongoose.Schema.Types.ObjectId },
    //     alias: String,
    //     details: String,
    //     phone: String,
    //     city: String,
    //     postalCode: String,
    // }, ],
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;