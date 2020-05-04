import React, { Fragment } from 'react';
import {Grid} from '@material-ui/core';
import {Image} from '../General/index'
import {connect} from 'react-redux';
import {Form} from '../General/index';


const SignUp = (props) => {
    return (
        <Fragment>
          <Grid container>
             <Grid item xs={12} sm={6}>
                 <Image part={'signup'}/>
                 </Grid> 
             <Grid item xs={12} sm={6}>
                 <Form part={'signup'} />
                 </Grid> 
          </Grid>
        </Fragment>
    )
}

export default connect()(SignUp);