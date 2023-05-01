import {Schema,model} from "mongoose";
import CyrillicToTranslit from 'cyrillic-to-translit'
const CategorySchema=new Schema({
  name:{
    type:String,
    required:true,
  },
  slug:{
    type:String,
    required:true,
  },
  postsOf:{
    type:Number,
    default:0
  },
  image:{
    type:String,
    default:''
  }

})
CategorySchema.pre('save',function(){
  const cyrillicToTranslit = new CyrillicToTranslit();
  this.slug=cyrillicToTranslit.transform(this.name,'-').toLowerCase();
})

export default model("Category",CategorySchema);