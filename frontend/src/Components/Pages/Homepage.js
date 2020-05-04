import React from 'react';
import Navbar from '../Navbar/Navbar';
import {Footer} from '../Footer/Footer';
import { Form, List } from '../General/index.js';
import { qualities } from '../Data/data';
import { Container, Header,
            Block, Image,
            Section, Text,
            Flex} from '../Styled/Styled';
import {connect} from 'react-redux';           
import { mapStateToProps } from '../StateTransition';

 const Main = ( props ) => {
      
  let mainBar = [
      {
          navLinkName : "Services",
          path : '/services'
      },
      {
          navLinkName : "Become A Professional",
          path : '/careers'
      },
      {
          navLinkName : "Contact Us",
          path : '/contact-us'
      },
      {
         navLinkName : "Login",
         path : '/login'
     },
     {
         navLinkName : "Create Account",
         path : '/signup'
     }
   ];
   
   return(
            <Container>
                 <Header>
                    <Block/>
                    <Navbar  
                    mainBar = {mainBar}
                    />
                    <div style={{display:"flex"}}>
                    <Image src = {'images/worker.jpg'} alt="failed"/>
                    <Form part = "homepage-header" />
                    </div>
                 </Header>                
             <Section>
                 <Text size={'1.4em'}>What We Offers!</Text>
                 <Flex>
                    <List part = "homepage-section" 
                    categories = {props.services} />
                 </Flex>
             </Section>
             <Section>
                <List part="homepage-section_quality" qualities={qualities}/>
                <Footer/>
             </Section>
            
            </Container>
    )

}
export default connect(mapStateToProps)(Main)