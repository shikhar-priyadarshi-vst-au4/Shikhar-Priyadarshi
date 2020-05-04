import React, { Fragment, useState, useEffect} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { MovieTab, TelevisionTab } from '../components/Tab'
import { List } from '../components/List';
import { FetchContext, AppProvider } from '../context/FetchContext';
import { MOVIES_DB, TVSHOWS_DB } from '../config/Links';



const Container = styled.div`
margin : 0em 1em;
`;
const TabBar = styled.div`
 margin : 1em 0em;
 padding : 1.2em 0em;
 display : flex;
 justify-content : space-around; 
 background-color : rgba(142, 126, 126, 0.08);
 border-radius : 0.3em;
 box-shadow : 1px 1px 1px 1px #808080b0;
 &:hover{ 
  box-shadow : 1px 2px 1px 1px #808080b0;
 }
`;

const footerStyle = {
  textAlign : 'center',
  margin:'0.5em 0em 2em 0em',
  fontSize : '3em'
}

const iconStyle = {
  border : '1px solid #272727',
  padding : '0.2em 0.6em',
  borderRadius : '2em',
  cursor : 'pointer'
}

export const App = ( ) => {
  
  const UpdateList = ( Movies, TVShows, showMoviesTab, showTVShowsTab ) => {
    console.log( Movies, TVShows);
    setLists({...lists, ...{Movies} , ...{TVShows}, ...{showMoviesTab}, ...{showTVShowsTab} });
  }
  const AppendList = ( {Movies, TVShows, showMoviesTab, showTVShowsTab} ) => {
        const randomPage = Math.floor(Math.random() * 100);
        let url = showMoviesTab ? MOVIES_DB : TVSHOWS_DB;
        (async( ) => {
            try {
              let data = await (await fetch(url + `&page=${randomPage}`)).json();
              if(showMoviesTab){
                Movies = [...Movies, ...data.results];
                console.log("Movies",Movies);
              } 
              else{
                TVShows = [...TVShows, ...data.results];
                console.log("TVShows",TVShows);
              }
              setLists({...lists, ...{Movies} , ...{TVShows}, ...{showMoviesTab}, ...{showTVShowsTab} });
            }
            catch(err){ console.log( err.message ) }
        })();  
      }
  const [ lists, setLists ] = useState({...FetchContext, UpdateList, AppendList});
  
  // CDM -
  useEffect( ( ) => {
    ( async ( ) => {
      try{
        let data = await (await fetch(MOVIES_DB)).json();
         UpdateList ( data.results, [], true, false );    
      }catch(error){
         console.log(error);
      }
     })();
  },[]);

  return (
    <Fragment>
     <Container> 
     <AppProvider value = {lists} >
     <TabBar>
        <MovieTab/>
        <TelevisionTab/>
     </TabBar>
     <List page = {'records'}/>
     </AppProvider>    
    <footer style = {footerStyle} > 
          <FontAwesomeIcon icon = {faChevronDown} style = {iconStyle} 
           onClick = {( ) => AppendList( lists ) }/> 
     </footer>
     </Container>
    </Fragment>
  );
}
