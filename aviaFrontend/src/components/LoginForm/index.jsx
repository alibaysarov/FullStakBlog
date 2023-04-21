import styled from '@emotion/styled';
import { Box, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';

const LoginForm = () => {
    const dispatch=useDispatch()
    const [showPassword,setShowPassword]=React.useState(false);
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const InputField=styled(TextField)(({theme})=>({
        width:'100%',
        maxWidth:'800px'
    }))
    const {register,formState:{errors,isValid},handleSubmit}=useForm();
    const onSubmit=(data)=>{
        // console.log(data);
        dispatch(login(data))
    }
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
                        <Typography variant={'h4'} component="h4">Войти</Typography>
                        <Stack sx={{width:'100%',marginTop:3}}  direction="column" spacing={2}>
                        
                        <TextField   id="outlined-basic" label="Email" variant="outlined"
                        {...register('email',{
                            required:'Введите email'
                        })}
                        />
                        {/* <TextField   id="outlined-basic" label="Парольы" variant="outlined" /> */}
                        <OutlinedInput 
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder='Пароль'
                            {...register('password',{
                                pattern:/[A-Za-z0-9]/,
                                minLength:{
                                    value:3,
                                    message:'Длина пароля меньше 3 символов'
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
                        <Button onClick={handleSubmit(onSubmit)} variant={'contained'} size="large">Войти</Button>
                        </Stack>
                        </Stack>

                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
};

export default LoginForm;