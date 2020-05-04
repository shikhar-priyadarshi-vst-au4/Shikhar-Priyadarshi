import Styled from 'styled-components';

export const Nav = Styled.nav`
position : ${props=>props.position||'relative'};
top : ${props=>props.top||'2em'};
left : ${props=>props.left||'0em'};
z-index : ${props=>props.index||'2'};
border : ${props=>props.border||'1px solid #272727'};
border-radius : ${props=>props.radius||'0.5em'};
background : ${props=>props.background||'#ffffff'};
@media screen and (max-width : 1024px){
    left : ${props=>props.sm_left||'0em'};
    top : ${props=>props.sm_top||'3em'};
    width : ${props=>props.sm_width||'100%'};
    height : ${props=>props.sm_height||'100%'};}`;    
    

export const NavElem = Styled.div`
position : ${props=>props.navElem||'relative'};
display : flex;
padding : 1.4em 0em;
@media screen and (max-width : 1024px){
flex-direction : column;
}`;

export const Brand = Styled.div`
margin : 1em;
width : 30%;
display : flex;
justify-content : space-between;
@media screen and (max-width : 1024px){
    width : 75%;
}`;

export const UL = Styled.div`
display : flex;
@media screen and (max-width : 1024px){
    flex-direction : column;
    display : none;
}`;

export const List = Styled.div`
text-decoration : none;
margin : 1.2em 0.5em;
letter-spacing : 0.1em;
color : #4a4a48;
font-size : 0.8em;
border : 1px solid #ffffff;
border-radius : 0.5em;
padding : 1.6em 2.5em;
cursor : pointer;
&:hover{
    border-color : #272727;
}
@media screen and (max-width : 1024px){
    width : fit-content;
}`;

export const Bar = Styled.div`
margin : 1em 0em 1em 2em;
@media screen and (min-width : 1025px){
    display : none;
}`;
export const BrandName = Styled.div`
display : flex;
cursor : pointer;
`;
export const Name = Styled.div`
margin : 0.2em;
font-size : 2em;    
`;
