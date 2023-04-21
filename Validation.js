import { body } from 'express-validator';

export const registerValidation=[
  body('email','Неверный формат почты!').isEmail(),
  body('password','Минимальная длина - 5 символов').isLength({min:5,}),
  body('fullName','Минимальная длина - 3 символа').isLength({min:3,}),
  body('avatarUrl').optional().isURL(),
];
export const postCreateValidation=[
  body('title','Введите заголовок статьи!').isLength({min:3,}).isString(),
  body('content','Введите текст статьи!').isLength({min:10,}).isString(),
  body('tags','Неверный формат тэгов').optional().isArray({min:0}),
  body('postImg','Неверная ссылка на изображение').optional().isString()
]