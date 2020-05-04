
import Styled from 'styled-components';


export const Container = Styled.div`
margin : 0.5em 1em;
`;
export const Block = Styled.div`
position : absolute;
left : 38em;
z-index : 0;
background-color : #33313b;
float : right;
width : 55%;
height : 1000px;
@media screen and (max-width : 1024px) {
    left : 15em;
    width : 64%;
}`
export const Header = Styled.div`
position : relative;
`;
export const Image = Styled.img`
width : 500px;
position : relative;
top : 3em;
left : 4em;
z-index : 1;
border-radius : 0.2em;
@media screen and (max-width : 1024px){
    display : none;
}
`;
export const Section = Styled.section`
position : relative;
top : 10em;
z-index : 1;
margin : 0em 0em 1em 3em;
@media screen and (max-width : 768px){
    margin : 0em 0em 1em 1em; 
}
`;

export const Text = Styled.div`
 font-size : ${props => props.size || '1.2em'} ;
 font-weight : ${props => props.weight|| '500'} ;
 letter-spacing : ${props => props.spacing || '1.5px'};
 color : ${props => props.fontcolor || '#272727'};
 text-decoration : none;
 cursor : ${props => props.cursor || 'default'};
 padding : ${props => props.padding || '0em'};
 @media screen and (max-width : 768px){
    font-size : ${props => props.sm_size || '1em'};
    font-weight : ${props => props.sm_weight|| '500'};
    padding : ${props => props.sm_padding || '0em'};
    margin : ${props => props.sm_margin || '0em'};
}`;        

export const Flex = Styled.div`
display : ${props => props.display||'flex'};
flex-wrap : ${props => props.wrap||'wrap'};
justify-content : ${props => props.justifyContent||'none'};
align-items : ${props => props.alignItems||'none'};
margin : ${props => props.margin ||'1em 1em'};
@media screen and (max-width:768px){
margin : ${props => props.sm_margin || '1em'};
flex-wrap : ${props => props.sm_wrap||'wrap'};
}`;

export const CardImage = Styled.img`
 width : ${props => props.width||'350px'};
 height : ${props => props.height||'200px'};
 border-top-left-radius: 0.5em;
 border-top-right-radius: 0.5em;
 @media screen and (max-width : 768px){
    width : ${props => props.sm_width||'370px'};
    height : ${props => props.sm_height||'300px'};
}`;


export const FooterStyle = Styled.footer`
border-top: 1px solid #272727;
`;

export const Margin = Styled.div`
margin : 0 8em 1em 0;
@media screen and (max-width:768px){
    margin : 1em 0;
}`;

export const Anchor = Styled(Text)`
cursor : pointer;
&:hover{
    font-weight : 500;
}`; 

export const GridContainer = Styled.div`
display : grid;
grid-template : 700px / 700px auto;
@media screen and (max-width : 768px) {
    grid-template : 300px / auto;

}
`;
export const ItemOne = Styled.div`
background-color : #33313b;
border : 1px solid #272727;
`;
export const ItemTwo = Styled.div`
border : 1px solid #ffffff;
`;

export const Position = Styled.div`
position : ${props => props.position || 'static'};
margin : ${props => props.margin || '6em 4em'};
@media screen and (max-width : 768px){
    margin : ${props => props.sm_margin || '2em 4em'};    
}`;

export const Chip = Styled(Position)`
z-index : 1;
left : ${props => props.left || '0em'};
top : ${props => props.top || '0em'};
@media screen and (max-width : 768px){
    left : ${props => props.sm_left || '0em'};
    top : ${props => props.sm_top || '0em'};
    
}`;

export const CustomPosition = Styled(Position)`
z-index : ${props => props.index || '0'};
top : ${props => props.top || '0em'};
left : ${props => props.left || '0em'};
@media screen and (max-width : 768px){
    top : ${props => props.sm_top || '0em'};
    left : ${props => props.sm_left || '0em'};
}`;

