import React from 'react';
import PageLayout from '../components/PageLayout';
import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const Welcome = () => {
    return (
        <PageLayout>
          <Stack justifyContent={'center'} alignItems={'center'} spacing={5}>
          <Typography component={'h2'} variant={'h2'}>Добро пожаловать на Aviation Blog</Typography>
          <Typography component={'p'} variant={'body1'}>Для просмотра статей вам нужно создать Аккаунт</Typography>
          <Stack spacing={2} direction={'column-reverse'} alignItems={'center'}>
            <Link to={'/login'} style={{textDecoration:'none'}}>
              <Button variant="text">Войти</Button>
            </Link>
            <Link to={'/register'} style={{textDecoration:'none'}}>
            <Button variant="contained">Зарегистрироваться</Button>
            </Link>
          </Stack>
          </Stack>
        </PageLayout>
    );
};

export default Welcome;