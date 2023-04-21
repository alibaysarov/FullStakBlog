import {useEffect} from 'react';

export const useTitle=(title,useeffect=false)=>{
    if(useeffect==false){
        document.title=title;
    }else{
        useEffect(()=>{
            document.title=title;
        },[])    
    }
        
}
