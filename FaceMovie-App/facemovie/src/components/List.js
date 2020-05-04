import React from 'react';
import styled from 'styled-components';
import { AppConsumer } from '../context/FetchContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
margin : 1.5em 0em;
`;

const TabList = styled.div`
margin : 1em;
display : flex;
justify-content : center;
flex-wrap: wrap;
`;

const TabListItem = styled.div`
margin : 1em 0.3em;
border : 1px solid #272727;
border-radius : 0.5em;
padding : 0.5em;
`;

const ListItem = styled.div`
width : 100%;
font-size : 0.5em;
margin : 1em 0em;
`;

const styleRating = {'border':'0.5px solid #ffffff',
'padding':'0.1em 0.6em',
'marginRight':'0.4em',
'color' : 'rgba(76, 70, 70, 0.7)',
'backgroundColor' : '#ffff00d9',
 'borderRadius' : '0.5em'};

const Item = styled(ListItem)`
letter-spacing : 0.1em;
font-style : sans-serif; 
`;

const Tab = styled(TabList)`

`;
const TabItem = styled(TabListItem)`
display : flex;
flex-direction : row `;

export const List = ( props ) => {

    return (
       <Container>
        { props.page ==='records' && <AppConsumer>
             {
                 context => <TabList>
                    
                     { context.showMoviesTab &&  context.Movies && context.Movies.map(( item, index ) => <TabListItem key = {item.id} >
                              
                              <Link to = {`/Movie/${item.id}`}><img src = {`http://image.tmdb.org/t/p/original/${item.poster_path}`} 
                                 width = '355px' height = '450px'
                                 alt="failed to load"  />
                              </Link>
                                 <div>
                                   <ListItem>{item.title}</ListItem>
                                   <ListItem>
                                       <small style={styleRating}>
                                       {item.vote_average} / 10
                                       </small>
                                       <small style = {{'color' : 'rgba(76, 70, 70, 0.7)'}}> FaceMovie ratings</small>
                                       </ListItem>
                                   <ListItem style = {{'color' : 'rgba(76, 70, 70, 0.7)'}}>{item.release_date}</ListItem>
                                 </div>
                   </TabListItem>)}
                  

                   { context.showTVShowsTab &&  context.TVShows && context.TVShows.map(( item, index ) => <TabListItem key = {item.id} >
                   <Link to = {`/TVShow/${item.id}`}><img src = {`http://image.tmdb.org/t/p/original/${item.poster_path}`} 
                                 width = '355px' height = '450px'
                                 alt="failed to load" />
                                </Link>
                                 <div>
                                   <ListItem>{item.original_name}</ListItem>
                                   <ListItem>
                                       <small style={styleRating}>
                                       {item.vote_average} / 10
                                       </small>
                                       <small style = {{'color' : 'rgba(76, 70, 70, 0.7)'}}> FaceMovie ratings</small>
                                       </ListItem>
                                   <ListItem style = {{'color' : 'rgba(76, 70, 70, 0.7)'}}>{item.first_air_date}</ListItem>
                                 </div>
                   </TabListItem>)}
                 </TabList>
             }
         </AppConsumer> }

         { props.page ==='movie' && <Tab>
             
             <TabListItem>
             <Item style={{
                 width : '300px',
             margin : '1em 0em' , fontSize : '1.8em'}}>{props.original_title}</Item>
             <Item style={{width : '300px'}}>{props.overview}</Item>
             
             </TabListItem>
             
             <TabListItem>
                                <img src = {`http://image.tmdb.org/t/p/original/${props.poster_path}`} 
                                 width = '355px' height = '450px' alt="failed to load" 
                                 />
                 </TabListItem>
                
                <TabListItem>
                    <Item style={{margin : '1em'}}>
                       {Math.floor(props.popularity)} <FontAwesomeIcon icon= {faStar}
                       style = {{fontSize : '2em'}}></FontAwesomeIcon> 
                    </Item>
                    <Item style={{margin : '1em'}}>{props.release_date}</Item>
                    <Item style={{margin : '1em'}}>{props.tagline}</Item>
                    <p style={{margin : '0.5em'}}>Genre</p>
                    <div style = {{display : 'flex'}}>
                    {props.genres && props.genres.map(val => <Item key={val.id}
                    style={{margin:'0em 1em', border : '1px solid #272727',
                    borderRadius :'1.8em', padding : '0.5em', textAlign : 'center'}}>{val.name}</Item>)}
                   </div>
                </TabListItem>
                <div style = {{display : 'flex', flexDirection : 'column'}}>
                <small style = { { textAlign :'center'}}>Powered by</small>
                <TabItem>
                     
                     {props.production_companies && props.production_companies.map(val => 
                         <div key={val.id}>
                             <img src={`http://image.tmdb.org/t/p/original/${val.logo_path}`}
                             width = '200px' height = '100px' alt="failed to load"/>
                             </div>
                     )}
                     </TabItem>

                </div>
                
             </Tab>}
       </Container>
   )
}