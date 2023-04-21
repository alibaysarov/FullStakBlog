import { Stack, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useDispatch } from 'react-redux';
import { getQueriedPosts } from '../../redux/slices/postSlice';

const MainPostsTitle = () => {
    const dispatch=useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const postsFilter=(query)=>{        
        dispatch(getQueriedPosts(query))
        handleClose()
    }
    return (
        <Stack direction={'horizontal'} spacing={15} alignItems={'end'}>
              <Typography variant={'h4'} component={'h4'}>
                Свежие посты
              </Typography>
              
              <IconButton 
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                >
               
               <FilterAltIcon/>
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem disabled onClick={handleClose}>Сортировать по: </MenuItem>
                <MenuItem  onClick={()=>postsFilter('date')}>По дате</MenuItem>
                <MenuItem onClick={()=>postsFilter('views')}>По популярности</MenuItem>
                
            </Menu>
            </Stack>
    );
};

export default MainPostsTitle;