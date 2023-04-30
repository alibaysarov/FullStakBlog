import {useLayoutEffect} from 'react';
import { useLocation } from 'react-router-dom';

export const useTitle=(title='')=>{
    const {pathname}=useLocation()
    if(title!=''){
        document.title=title;
    }else{
     useLayoutEffect(()=>{
        
            console.log(pathname);
            if(pathname=='/categories'){
                document.title='AviA Blog | Категории'
            }
            if(pathname=='/'){
                document.title='AviA Blog | Главная'
            }
            
            if(pathname.includes('/user/')){
                document.title='Мой профиль'
            }
        
        
    },[location])
    }
    
        
}
