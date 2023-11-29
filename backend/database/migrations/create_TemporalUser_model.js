const mongoose = require("mongoose");
module.exports ={
	name:{
		type: String,
		required:true,
		trim: true,
		lowercase:true, 
	},
	password:{
		type:String,
		required:true,
	},
	email:{
		type:String,
		required:true,
		trim:true,
	},
	roles: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Role",
	},
	],
	emailToken:{
		type: String,
		require:true
	},
	createdAt: { type: Date, default: Date.now },
	expireAt: {
		type: Date,
		default: Date.now() + 24*60 * 60 * 1000
	}
}