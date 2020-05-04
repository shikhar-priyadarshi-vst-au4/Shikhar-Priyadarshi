import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { Image, Form } from '../General/index'
import { connect } from 'react-redux';
const Login = (props) => {
    return (
        <Fragment>
          <Grid container>
             <Grid item xs={12} sm={6}>
                 <Image part={'login'}/>
                 </Grid> 
             <Grid item xs={12} sm={6}>
                 <Form part={'login'}/>
                 </Grid> 
          </Grid>
        </Fragment>
    )
}

export default connect()(Login);