import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

const SmallCard = ({title, link, img}) => {

    const SmallCard=styled(Card)({
		transition:'all 0.3s ease-in',
        width:'100%',
        minWidth:'400px',
        maxWidth:'400px',
		'&:hover':{
			transform:'translateY(-5px)'
		}
	})

    return (
        <Link to={link} style={{textDecoration:'none'}}>
			<SmallCard >
                <CardMedia
                    component="img"
                    height="155"
                    image={img}
                    alt={title}
                />
				<CardContent padding={.7}>
					<Stack direction={'column'} alignItems={'flex-start'} spacing={3}>
						<Typography variant='h5' component={'h5'}>{title}</Typography>
                        <Link to={link} style={{textDecoration:'none'}}>
						    <Button variant='text'>Подробнее</Button>
                        </Link>
					</Stack>
				</CardContent>
			</SmallCard>
		</Link>
    );
};

export default SmallCard;