import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';
export const register=async(req,res)=>{
  try {
    const sameUser= await  UserModel.findOne({email:req.body.email}).exec();
    
    if (sameUser) {
      res.status(400).json({
        message:'Пользователь с таким email уже зарегистрирован'
      })
    } else {
      
    const {password}=req.body;
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);

    const doc=new UserModel({
      fullname:`${req.body.firstName} ${req.body.lastName}`,
      email:req.body.email,
      avatarUrl:req.body.avatarUrl,
      passwordHash:hash
    })
    const user=await doc.save()
    const token=jwt.sign({
      _id:user._id,

    },'secret123',{
      expiresIn:'30d',
    })

    const {passwordHash,...userData} =user._doc;
    res.json({
      ...userData,
      token
    })

    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:'Не удалось создать пользователя'
    })
  }
}
export const login=async(req,res)=>{
  try {
    const {email,password}=req.body;
    const user=await UserModel.findOne({email}).exec();
    if (!user) {
      res.status(400).json({
        message:'Пользователь не найден'
      })
    } else {
      const isMatch=await bcrypt.compare(password,user.passwordHash);
      if (!isMatch) {
        res.status(400).json({
          message:'Неверный пароль'
        })
      } else {
        const token=jwt.sign({
          _id:user._id,},'secret123',{
          expiresIn:'30d',
          });
          res.status(200).json({
            user:user._doc,
            token
          })
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message:'Не удалось авторизоваться'
      })
    }
}
export const subscribe=async(req,res)=>{
  try {
    const followerId=req.user._id;
    const userToSubscribeId=req.body.id;
    const userToSubscribe=await UserModel.findByIdAndUpdate(userToSubscribeId,{
      $push:{
        followers:followerId
      }
    },{new:true});
    const folower=await UserModel.findByIdAndUpdate(followerId,{
      $push:{
        subsribtions:userToSubscribeId
      }
    },{new:true});
    res.status(201).json({
      user:userToSubscribe,
      folower
    })
  }catch{
    res.status(500).json({
        message:'Не удалось подписаться'
      })
  }
}
export const getUser=async(req,res)=>{
  try {
    const {_id}=req.user;
    const user=await UserModel.findById(_id).exec();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({msg:err.message});
  }
}
export const getAnotherUser=async(req,res)=>{
  try {
    const {id}=req.params;
    const user=await UserModel.findById(id).select('-passwordHash').exec()
    if (!user) {
     return res.status(404).json({err:'Пользователь не найден'})
    } else {
      return res.status(200).json(user)
    }
  } catch (err) {
    return res.status(500).json({message:err.message})
  }
}
export const getSubscriptions=async(req,res)=>{
  const {_id}=req.user;
  try {
    const users=await UserModel.findById(_id).populate('subsribtions').select('subsribtions').exec()
      
    
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
}