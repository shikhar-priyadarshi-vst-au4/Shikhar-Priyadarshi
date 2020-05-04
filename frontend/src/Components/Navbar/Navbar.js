import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Logo } from './logo'
import { Nav, NavElem, Brand, 
         BrandName, Name, Bar,
         UL, List} from './Styled';
import { connect } from 'react-redux';
import { Button, Menu, MenuItem, makeStyles, Avatar } from '@material-ui/core'
import { mapStateToProps } from '../StateTransition/index';
import { logout } from '../../Actions/index'
import { customerLogoutInitiate } from '../../Actions/customer';
const useStyle = makeStyles({
    root : {
        margin : '1.3em 1em'
    }
})


const Navbar = ( { isAuthenticated, data , 
    isCustomerAuthenticated, customerData, mainBar,...props} ) => {
    const [ toggle, setToggle ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const classes = useStyle();
    const toggleClick = ( ) => {
        setToggle(!toggle);
     }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
      };

    const Logout = () => {
        props.dispatch(isAuthenticated?logout():customerLogoutInitiate());
        handleClose();
    }  
    
    if(isAuthenticated || isCustomerAuthenticated){
        mainBar = mainBar.filter(({navLinkName}) => (!['Create Account',
            'Login'].includes(navLinkName)));
    }
    
    const display = { display : "flex"};
    
    return(
        <Nav {...props}>
         <NavElem {...props}>
         <Brand>
         <BrandName as={Link} to={'/'} style={{textDecoration : "none", color:'#e40475'}}>
         <Logo/>
         <Name>Towny</Name>
         </BrandName>
         <Bar onClick = {() => toggleClick()}>
             <FontAwesomeIcon icon = {faBars} size={'2x'}/>
         </Bar>
         
         </Brand> 
          <UL style = {toggle?display : {}} >
              { (!isAuthenticated && !isCustomerAuthenticated) && mainBar?.map(({navLinkName, path},
               index) => <List 
                          as = {Link}
                          to = {path}
                          style = { navLinkName === 'Create Account'?{borderColor : "#272727"}: {} }
                          key={index} >{navLinkName}</List> 
              )}
             { (isAuthenticated || isCustomerAuthenticated) && mainBar?.map(({navLinkName, path},
               index) => 
               <List 
                          as = {Link}
                          to = {path}
                          key={index} >{navLinkName}</List> 
                       
              
             )}
            { (isAuthenticated || isCustomerAuthenticated) && 
            <div className={classes.root}>
            <Button aria-controls="simple-menu" aria-haspopup="true" 
            variant={'contained'} color={'secondary'}
            startIcon={<Avatar alt={`${(isAuthenticated?data.name : customerData.name).slice(0,1)}`} 
            src={`${isAuthenticated?data.image:customerData.image}`} />}
            endIcon={<FontAwesomeIcon icon={faChevronDown} onClick={handleClick}/>}
            >
            {isAuthenticated?data.name:customerData.name}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}
              to={'/user'} 
              component={Link}>Profile</MenuItem>
              <MenuItem onClick={handleClose}
              to={'/user'}
              component={Link}>My account</MenuItem>
              <MenuItem onClick={Logout}>Logout</MenuItem>
            </Menu>
          </div> }
          </UL>
          </NavElem>
        </Nav>
    )
}

export default connect(mapStateToProps)(Navbar);              





