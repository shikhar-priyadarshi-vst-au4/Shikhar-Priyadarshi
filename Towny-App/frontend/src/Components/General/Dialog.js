import React from 'react';
import { Button, Dialog, 
         DialogActions, DialogContent, 
         DialogContentText, DialogTitle } from '@material-ui/core';
import {Link} from 'react-router-dom';         
export default function AlertDialog( { profileCreated, isLoggedIn, part, handleClose, data }, ...rest ) {
  console.log(data);
  return (
    <div>
      <Dialog
        open={part === 'career-login'?isLoggedIn : profileCreated }
        onClose={() => handleClose(part === 'career-login'?"isLoggedIn" : "profileCreated")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Welcome to Towny"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{fontWeight : "500"}}>
           { part === 'career-login'? `You're logged in successfully`
           :`Profile created successfully. The required creditenials have seen saved with Towny.
              Login to check the profile.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={() => handleClose(part === 'career-login'?"isLoggedIn" : "profileCreated")}
           color="primary" autoFocus>
            Proceed
          </Button>
          <Link style = {{textDecoration : "none"}} 
          to={`/dashboard`}><Button color="primary">Go to dashboard</Button></Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}