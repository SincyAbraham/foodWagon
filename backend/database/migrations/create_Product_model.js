module.exports ={
	name: { type: String, required: true},
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true},
    description: { type: String, required: false},
    img: { data: Buffer,contentType: String},
    active: { type: Boolean, required: true, default: true },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}