import React from 'react';
import PageLayout from '../components/PageLayout/index';
import { Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import SmallCard from '../components/SmallCard';
import AnimatedPage from '../components/AnimatedPage';

const CategoryMainPage = () => {
	
	
	
    return (
        <PageLayout>
			<AnimatedPage>
            <Typography variant={'h2'} component={'h2'}>
                Категории
            </Typography>
						<Stack  direction={'column'}  sx={{marginY:6}} spacing={4}>
							<Typography variant={'h4'} component={'h4'}>
								Справочник
							</Typography>
							<Stack sx={{flexDirection:{md:'row',xs:'column'},gap:5}}   marginY={5}>
							<SmallCard title={'Самолеты'} link={'/category/planes'} img={'/Mig-29.webp'}/>
							<SmallCard title={'Вертолеты'} link={'/category/helis'} img={'/Ah-1Z.jpg'}/>
							</Stack>
						</Stack>
						<Stack  direction={'column'}  sx={{marginY:6}} spacing={4}>
							<Typography variant={'h4'} component={'h4'}>
								Авиационная литература
							</Typography>
							<Stack sx={{flexDirection:{md:'row',xs:'column'},gap:5}}   marginY={5}>
							<SmallCard title={'Мемуары летчиков '} link={'/category/planes'} img={'/Mig-29.webp'}/>
							<SmallCard title={'РЛЭ'} link={'/category/afm'} img={'/POH.png'}/>
							</Stack>
						</Stack>
			</AnimatedPage>
        </PageLayout>
    );
};

export default CategoryMainPage;