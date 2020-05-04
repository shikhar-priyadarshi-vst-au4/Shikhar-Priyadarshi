import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MOVIE_QUERY_WITH_ID, API_KEY } from '../config/Links';
import { List } from './List';

export const Movie = ( ) => {
    let params = useParams();
    let [ movie, setMovie ] = useState( );
    useEffect(( ) => {
        let url = MOVIE_QUERY_WITH_ID +`${params.MovieId}?api_key=${API_KEY}`;
        (async( )=>{
            try{
                 let data = await (await fetch(url)).json();
                 setMovie(data);
            } 
            catch(err){
                console.log(err.message);
            }
        })()
    },[])
return <List page = "movie" {...movie}/>
}