import styled from '@emotion/styled';
import { Box, Button, Container, FormControl, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerUser } from './../../redux/slices/authSlice';

const RegisterForm = () => {
    const dispatch=useDispatch();

    const [showPassword,setShowPassword]=React.useState(false);
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const {register,formState:{errors,isValid},handleSubmit}=useForm();
    const onSubmit=(data)=>{
        console.log(data,isValid);
        
        dispatch(registerUser(data))
        
    }
    const InputField=styled(TextField)(({theme})=>({
        width:'100%',
        maxWidth:'800px'
    }))
    return (
        <Box marginY={10} paddingY={5}>
            <Container>
                <Stack justifyContent={'center'} alignItems={'center'}>
                    <Paper elevation={2} sx={{
                        paddingX:7,
                        paddingY:4,
                        width:'100%',
                        maxWidth:700,
                    }}>
                        <Stack alignItems={'center'} >
                        <Typography variant={'h4'} component="h4">Регистрация</Typography>
                        <Stack sx={{width:'100%',marginTop:3}}  direction="column" spacing={2}>
                        
                             <InputField
                               
                                id="outlined-basic"
                                error={errors.firstName?true:false}
                                helperText={errors.firstName&&errors.firstName.message}
                                label="Имя"
                                variant="outlined"
                                {...register('firstName',{
                                    onChange: (e) => {
                                        e.target.value=e.target.value.replace(/[0-9]/,'')
                                        
                                    },
                                    minLength:{
                                        value:2,
                                        message:'Длина не менее 2 символов'
                                    },
                                    required:"Вы не ввели имя",
                                    
                                })}    
                             />
                             
                            <TextField  
                                id="outlined-basic"
                                label="Фамилия"
                                variant="outlined"
                                {...register('lastName',{
                                    minLength:2,
                                    required:"Вы не ввели Фамилию",

                                })} 
                             />
                            <TextField   id="outlined-basic" label="Email" variant="outlined" />
                        
                        <OutlinedInput 
                            type={showPassword ? 'text' : 'password'}
                            error={errors.password?true:false}
                                helperText={errors.password&&errors.password.message}
                            id="password"
                            placeholder='Пароль'
                            {...register('password',{
                                pattern:/[A-Za-z0-9]/,
                                minLength:{
                                    value:8,
                                    message:'Длина пароля меньше 8 символов'
                                },
                                required:'Введите пароль'
                            })}
                            endAdornment={
                            <>
                            <InputAdornment position="end">
                                <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={handleClickShowPassword}
                                 onMouseDown={handleMouseDownPassword}
                                 edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                    
                                </IconButton>
                            </InputAdornment> 
                            </>
                            }
                            >
                        
                        </OutlinedInput>
                        <Button  onClick={handleSubmit(onSubmit)} variant={'contained'} size="large">зарегистрироваться</Button>
                            
                        
                        
                        
                        </Stack>
                        </Stack>

                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
};

export default RegisterForm;