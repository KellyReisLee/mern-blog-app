const mongoose = require('mongoose');
const { Schema } = mongoose;


const postSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ["Javascript", "CSS", "HTML", "Node.js", "Bootstrap", "React.js", "Tailwind"], message: "{VALUE is not supported." },
  description: { type: String, required: true },
  image: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },


}, { timestamps: true })


const postModel = mongoose.model('Post', postSchema)

module.exports = postModel