
import React from 'react';
import { Navigate, useLocation } from 'react-router';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import AnimatedPage from '../components/AnimatedPage';
import { useSelector } from 'react-redux';


const RegisterPage = () => {
    const {pathname}=useLocation();
    // console.log(loc.pathname); 
    const {isAuth} =useSelector(state=>state.auth)
    return (
        <>
        
        <AnimatedPage>
        {
            pathname=='/register'
            ?(<RegisterForm/>)
            :(<LoginForm/>)       
        }
        </AnimatedPage>
        {isAuth&&<Navigate to={'/'}/>}
        
        </>
    );
};

export default RegisterPage;