import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GroupIcon from '@mui/icons-material/Group';
import InterestsIcon from '@mui/icons-material/Interests';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawerHandler } from '../../redux/slices/uiSlice';
const MenuMobile = () => {
  const {isDrawerOpened}=useSelector(state=>state.ui);
  const dispatch=useDispatch()
  
  return (
    <>
     <Drawer
     anchor='left'
     open={isDrawerOpened}
     onClose={()=>dispatch(openDrawerHandler())}
     >
        <Box sx={{width:'100%',maxWidth:'300px'}}>
          <List>
            {
              [
                {
                text:'Мой профиль',
                icon:<AccountCircleIcon/>
                },
                {
                text:'Рекомендации',
                icon:<InterestsIcon/>
                },
                {
                text:'Мои авторы',
                icon:<GroupIcon/>
                },
                {
                text:'Сохраненное',
                icon:<BookmarkIcon/>
                },
            ].map((item,idx)=>(
                  <ListItem key={idx}>
                    <ListItemButton>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))
            }
          </List>
        </Box>
      </Drawer> 
    </>
  );
};

export default MenuMobile;