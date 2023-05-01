import { mongoose } from 'mongoose';
const UserSchema=new mongoose.Schema({
  fullname:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  passwordHash:{
      type:String,
      required:true,
  },
  avatarUrl:String,
  posts:[
    {
      type:mongoose.Schema.Types.ObjectId,ref:'Post',
    }
  ],
  likedPosts:[
    {type:mongoose.Schema.Types.ObjectId,ref:'Post'}
  ],
  markedPosts:[
    {
      type:mongoose.Schema.Types.ObjectId,ref:'Post',
      default:[]
    }
  ],
  subsribtions:[
    {
      type:mongoose.Schema.Types.ObjectId,ref:'User',
      default:[]
    }
  ],
  followers:[
    {
      type:mongoose.Schema.Types.ObjectId,ref:'User',
      default:[]
    }
  ],
  
},{
  timestamps:true
})
export default mongoose.model('User',UserSchema)