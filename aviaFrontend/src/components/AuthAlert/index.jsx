import styled from '@emotion/styled';
import {Alert}  from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';

const AuthAlert = () => {
    const {authStatus}=useSelector(state=>state.auth);
    const severity=authStatus.loggedIn?'success':'error';
    const [show,setShow]=React.useState(true);
    const AuthAlert=styled(Alert)(({theme})=>({
        position:'fixed',
        zIndex:1525,
        transition:'all 0.5s ease-out',
        top:'170px',
        right:'30px',
        opacity:show?'1':'0'
    }))
    React.useEffect(()=>{
        setTimeout(()=>setShow((prev)=>!prev),2000)
    },[])
    const animation={
        initial:{
            opacity:0,
            x:-50
        },
        animate:{
            opacity:1,
            x:0
        },
        exit:{
            opacity:0,
            x:-50
        }
    }
    return (
        <motion.div
            variants={animation}
            initial={'initial'}
            animate={'animate'}
            exit={'exit'}
        >
            <AuthAlert severity={severity} >
                {authStatus.message}
            </AuthAlert>
        </motion.div>
    );
};

export default AuthAlert;