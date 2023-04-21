import mongoose from "mongoose";
import express from "express";
import {PostController, UserController} from './controllers/index.js';
import cors from 'cors'
import { postCreateValidation,registerValidation } from './Validation.js';
import axios from "axios";
import jsdom from 'jsdom';
import multer from "multer";
import * as url from 'url';
import { validationResult } from "express-validator";
import postsRouter from './routers/postsRouter.js';
import { postCreateErrorCheck } from "./middleware/postCreateErrorCheck.js";
import { authMiddleWare } from './middleware/authMiddleware.js';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./aviaFrontend/uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});


const app=express();
app.use(cors())
app.use(express.json())
app.use('/posts',postsRouter);
app.use(express.static(__dirname));
const upload=multer({storage:storageConfig})

mongoose.connect('mongodb+srv://admin:d59tjtfj@cluster0.f2hokgu.mongodb.net/aviationBlog')
.then(()=>console.log('DB is Ok'))
		.catch((err)=>console.log('DB Error',err))


const fileUploader=(req,res,next)=>{
	const filedata=req.file;
	try {
		
		if(!filedata){
			res.status(500).send("Нет изображения статьи!");
		}else{
			let postImg=filedata.path;
			postImg=postImg.replace(/\\+/g,'/')
			postImg=postImg.replace("aviaFrontend","");
			
			let{body}=req;
			req.body={...body};
			const obj1=JSON.parse(req.body.body);
			req.body={...obj1,postImg}
			// console.log('final object is: ',req.body);
			// res.send("Все хорошо!")
			next();
		}
		
	} catch (err) {
		res.status(500).send("Ошибка при загрузке!")
	}
}

const PORT=5000;
const errHandlerMiddleWare=(req,res,next)=>{
	const errors=validationResult(req.body) ;
	console.log('Тело запроса ',req.body);
	console.log(errors.isEmpty());
	if(errors.isEmpty()){
		console.log(req.body);
		next()
	}else{
		res.json(errors)
	}
}
// app.post('/posts/create',postCreateValidation,upload.single("filedata"),fileUploader,errHandlerMiddleWare)
app.post('/auth/register',registerValidation,UserController.register)
app.post('/addPost',upload.single("filedata"),fileUploader,postCreateValidation,postCreateErrorCheck,PostController.create)
// app.post('/posts/create',postCreateValidation,postCreateErrorCheck)
//get
app.get('/posts',authMiddleWare,PostController.getAll)
app.get('/posts/query',authMiddleWare,PostController.filteredPosts)
app.get('/posts/:id',PostController.getOne)
app.get('/posts/filterBy/:query',PostController.sortBy)
app.get('/tags/:tag',PostController.taggedPosts)
app.get('/post/:id/likes',PostController.setLike)



//user
app.post('/auth/register',UserController.register)
app.post('/auth/login',UserController.login)
app.get('/auth/me',authMiddleWare,UserController.getUser);
app.get('/user/subs',authMiddleWare,UserController.getSubscriptions)
app.post('/user/subscribe',authMiddleWare,UserController.subscribe)

app.get('/profile/:id',UserController.getAnotherUser);
app.get('/parse/',async(req,res)=>{
	const baseurl='http://www.airwar.ru/'
	const {JSDOM}=jsdom
	const {data}= await axios.get('http://www.airwar.ru/alnow.html')
	const dom=new JSDOM(data)
	let links=dom.window.document.
		getElementById('AutoNumber3').querySelector('p[align="left"]').querySelectorAll('a')
	links=[...links].map(link=>link.getAttribute('href')).filter(el=>el!=null).map(item=>baseurl+item)
	let posts=links.map(async(link)=>{
		const getMeHTML=async()=>{
			const postHTML=await axios.get(link).data
			const postDom= new JSDOM(postHTML)
			const title=postDom.window.document.getElementById('AutoNumber1')
			return title
		}
		return await getMeHTML();
	})
	console.log(posts);
	res.send(posts)
})

app.listen(PORT,()=>console.log('server started'))