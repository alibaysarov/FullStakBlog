import multer from 'multer';
import * as url from 'url';
import path from 'path'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
export const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'/images/')
  },
  filename:(req,file,cb)=>{
    cb(null,`${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
  }
})
const types=['image/png','image/jpeg','image/jpg']
export const fileFilter=(req,file,cb)=>{
  if(types.includes(file.mimetype)){
    cb(null,true)
  }else{
    cb(null,false)
  }
}

// export default multer({storage,fileFilter});
export default multer({dest:path.join(__dirname,'/images/'),fileFilter});