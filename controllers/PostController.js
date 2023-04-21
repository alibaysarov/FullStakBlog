import PostModel from '../models/Post.js'
import { validationResult } from 'express-validator';
//post
export const create=async (req,res)=>{
    try {
      const errors=validationResult(req);
      if(errors.isEmpty()){
        const doc= new PostModel({
          title:req.body.title,
          postImg:req.body.postImg,
          author:req.body.userId,
          content:req.body.content,
          tags:req.body.tags
        })
        const post=await doc.save()
        res.status(201).json(post)
      }else{
        res.status(400).json({err:errors.array()})
      }

    } catch (err) {
      console.log(err)
        res.status(500).json({
            message:'Не удалось создать пост!!'
        })
    }
  }
//get
export const getAll=async(req,res)=>{
  try {
    
    const posts=await PostModel.find().sort({updatedAt:-1}).exec()
    res.json(posts)
  } catch (err) {
    res.status(500).json({message:'Не удалось получить записи'})
  }
}
export const getOne=async(req,res)=>{
try {
  const postId=req.params.id;
   PostModel.findOneAndUpdate(
    {
      _id:postId
    },
    {
      $inc:{views:1}
    },
    {
      returnDocument:'after'
    },
    (err,doc)=>{
      if(err){
          console.log(err)
          return res.status(500).json({
              message:'Не удалось вернуть статью!!'
          }) 
      }
      if (!doc) {
          return res.status(404).json({
              message:'Статья не найдена'
          })
      }

      res.json(doc)
  } 
  )
} catch (err) {
  console.log(err);
  res.status(500).json({message:'Ошибка при получении статьи!'})
}
}
export const sortBy=async(req,res)=>{
  try {
    const {query}=req.params;
    let posts;
    switch (query) {
      case 'views':
        posts=await PostModel.find().sort({views:-1})
        res.json(posts)
        break;
      case 'abc':
        posts=await PostModel.find().sort({title:-1})
        res.json(posts)
        break;
      default:
        posts=await PostModel.find().exec()
        res.json(posts)
        break;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message:'Ошибка при соортировке постов'})
  }
}
export const taggedPosts=async(req,res)=>{
  try {
    const tag=req.params.tag
    const posts=await PostModel.find({tags:tag})
    if(!posts.length){
      res.status(404).json({
        message:'Посты не найдены!'
      })
    }else{
      res.status(200).json(posts)
    }
  } catch (err) {
    res.status(500).json({message:`Ошибка при получении постов\n${err}`})
  }
}
export const filteredPosts=async(req,res)=>{
  // const {filter}=req.query
  // console.log(filter);
  try{
    let posts;
    switch (req.query.filter) {
      case 'date':
        posts=await PostModel.find().sort({"created_at": -1 })
        res.status(200).json(posts)
        break;
      case 'views':
        posts=await PostModel.find().sort({"views": -1 })
        res.status(200).json(posts)
      default:
        break;
    }

  }catch(err){
    res.status(500).json(err)
  }
  
}
export const setLike=async(req,res)=>{
  try {
    const postId=req.params.id;
    const {liked}=req.query;
     PostModel.findOneAndUpdate(
      {
        _id:postId
      },
      {
        $inc:{likes:1}
      },
      {
        returnDocument:'after'
      },
      (err,doc)=>{
        if(err){
            console.log(err)
            return res.status(500).json({
                message:'Не удалось вернуть статью!!'
            }) 
        }
        if (!doc) {
            return res.status(404).json({
                message:'Статья не найдена'
            })
        }
  
        res.json(doc)
    } 
    )
  } catch (err) {
    console.log(err);
    res.status(500).json({message:'Ошибка при получении статьи!'})
  }
  }