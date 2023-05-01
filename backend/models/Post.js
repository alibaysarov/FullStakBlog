import mongoose from "mongoose";

const PostSchema=new mongoose.Schema({
  title:{
    required:true,
    type:String,
  },
  postImg:{
    type:String
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  content:{
    required:true,
    type:String,
  },
  tags:[{type:String}],
  views:{
    type:Number,
    default:0
  },
  likes:{
    type:Number,
    default:0
  },
  
},{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})
export default mongoose.model('Post',PostSchema)