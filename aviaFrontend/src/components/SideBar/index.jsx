import { Grid, Paper } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';

const SideBar = ({children,elevation=3,sx={}}) => {
  const SideBarContent=styled(Paper)(({theme})=>({
    padding:16,
    borderRadius:10,
    
  }))
  return (
    
      <SideBarContent sx={sx} elevation={elevation}>
        {children}
      </SideBarContent>
    
  );
};

export default SideBar;