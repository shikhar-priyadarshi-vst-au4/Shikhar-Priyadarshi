import React from 'react';
import styled from 'styled-components';
import { MOVIES_DB, TVSHOWS_DB } from '../config/Links';
import { AppConsumer } from '../context/FetchContext';
const Tab = styled.div`
  letter-spacing : 0.2em;
  font-size : 1.2rem;
  padding : 0.5em 1em; 
  text-align:center;   
  cursor : pointer;  
  border : 0.6px solid #272727;
  border-radius : 1.6em;
  &:hover {
    border : 1px solid red;  
    color : red;  
  }
`;


const asyncContextFunc = async ( context, url, Tab ) => {
    let { UpdateList, Movies, TVShows } = context;
    let randomPage = Math.floor(Math.random()*100);
    try {
        let data = await (await fetch(url + `&page=${randomPage}`)).json();
        (Tab === 'Movies')?UpdateList ( data.results, TVShows, 
            true, false ):UpdateList ( Movies, data.results
             , false, true );
    }
     catch (error) {
         console.log(error);
     }
}


export const MovieTab = ( ) => {
       
    return (
      <AppConsumer>
     { context =>
              <Tab
              onClick = {context.showTVShowsTab? ( ) => asyncContextFunc( context, MOVIES_DB,
                'Movies' ) : ( ) => { }} 
                 >
              Movies
             </Tab>
     }     
      </AppConsumer>
  )
}

export const TelevisionTab = ( ) => {
   return (
    <AppConsumer>
    { context =>
             <Tab
             onClick = {context.showMoviesTab? ( ) => asyncContextFunc( context, TVSHOWS_DB,
               'TVShows' ) : ( ) => { }} 
                >
             TVShows
            </Tab>
    }     
     </AppConsumer>
   );
}





















/* const fetchMovies = async ({ UpdateList }) => {
          
        let randomPage = Math.floor(Math.random()*100);
        try {
            let movieData = await (await fetch(MOVIES_DB + `&page=${randomPage}`)).json();
            UpdateList ( movieData.results, [], true, false );
        }
         catch (error) {
             console.log(error);
         }
     
        }
   */