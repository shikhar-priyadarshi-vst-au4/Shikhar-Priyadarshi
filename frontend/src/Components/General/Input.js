import React, { Fragment, useState } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {FormControl, 
        TextField, 
        MenuItem, 
        InputLabel,
        Select } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import { Flex,} from '../Styled/Styled'
import { isFullName, isEmail,
        isNumber, isPassword} from '../../Validations/index';
import {locations, categories} from '../Data/data';        
const useStyles = makeStyles((theme) => ({
    formControl :{
        margin : theme.spacing(1)
    },
    career :{
        margin : "1em 0em"
    }
  }));
const theme = createMuiTheme({
    palette: {
      primary: grey
    },
  });  
export const Input = ( { city, service, 
                        setCity, setService,
                        createProfile, setCreateProfile,
                        loginFields, setLoginFields,
                        handleChange,  part }, ...rest ) => {
    const classes = useStyles();
    const [validations, setValidations] = useState({
        Fullname : {status : false, msg : ""},
        Email : {status : false, msg : ""},
        Password : {status : false, msg : ""},
        Number : {status : false, msg : ""},})
    const inputs = (createProfile||loginFields)?Object.entries(createProfile?createProfile:loginFields):"";
    const ChangeHandler = (e, cb, state) => {
        let { name, value } = e.target;
        let { Fullname, Email, Password, Number } = validations
        switch(name){
            case 'Fullname' :
                     let dataName = isFullName(value);
                    setValidations({...validations,...{Fullname : {...Fullname, 
                        ...{status : dataName.status}, ...{msg : dataName.msg}}}});
                    break;
            case 'Email' : 
                     let dataEmail = isEmail(value)
                    setValidations({...validations,...{Email:
                        {...Email, ...{status : dataEmail.status }, ...{msg : dataEmail.msg}}}});
                    break;
            case 'Password' :
                     let dataPassword = isPassword(value)
                    setValidations({...validations, ...{Password:{...Password, 
                        ...{status : dataPassword.status}, ...{msg : dataPassword.msg}}}});
                    break;
            case 'Number' : 
                     let dataNumber = isNumber(value)
                    setValidations({...validations,...{Number:{...Number, 
                        ...{status : dataNumber.status}, ...{msg : dataNumber.msg}}}});
                    break;        
        }  
        cb({...state, [name] : value});
      } 
    //  const checker = (value, fn) => { 
    //     let data = fn(value);
    //      return data;
    //  }   
    return(
        <Fragment>
        
        {part === 'homepage-header' && <Fragment>
           
            <TextField id="outlined-search" label="Search " type="search" variant="outlined"
             value={service}
             onChange = {(event) => handleChange(event,setService)}/>
              <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Choose your city</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={city}
                    onChange={(event) => handleChange(event, setCity)}
                    label="Choose your city"
                    >
                    <MenuItem value="">
                        <em>Choose a city</em>
                    </MenuItem>
                        {locations.map(({name}, index) =>  <MenuItem 
                        value={name}
                        key = {index}>{name}</MenuItem>)}
                    </Select>
             </FormControl>

        </Fragment>}

        {part === 'career' && <Fragment>
        <ThemeProvider theme={theme}>
        <Flex wrap={'none'} style={{flexDirection:"column"}} >
        {inputs.slice(0,4).map((field, index) => <TextField
        id={`outlined-secondary-${index}`}
        key = {index}
        label={`${field[0]}`}
        variant="outlined"
        color="primary"
        margin="normal"
        name={field[0]}
        value = {field[1]}
        type={(field[0] === 'Password')?field[0].toLowerCase():""}
        onChange = {(e) => ChangeHandler(e, setCreateProfile, createProfile)}
        fullWidth/>
        )}
        <FormControl variant="outlined" className={classes.career}>
                    <InputLabel id="demo-simple-select-outlined-label">Area</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Choose your Area"
                    value={inputs[4][1]}
                    name={inputs[4][0]}
                    onChange = {(e) => ChangeHandler(e, setCreateProfile, createProfile)}
                    fullWidth>
                    <MenuItem value="">
                        <em>Choose an Area</em>
                    </MenuItem>
                        {locations.map(({name}, index) =>  <MenuItem 
                        value={name}
                        key = {index}>{name}</MenuItem>)}
                    </Select>
             </FormControl>
        <FormControl variant="outlined" className={classes.career}>
                    <InputLabel id="demo-simple-select-outlined-label">Work</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Choose your specification"
                    value={inputs[5][1]}
                    name={inputs[5][0]}
                    onChange = {(e) => ChangeHandler(e, setCreateProfile, createProfile)}
                    fullWidth>
                    <MenuItem value="">
                        <em>Select option</em>
                    </MenuItem>
                        {categories.map(({name}, index) =>  <MenuItem 
                        value={name}
                        key = {index}>{name}</MenuItem>)}
                    </Select>
             </FormControl>
        </Flex>
        </ThemeProvider>
            </Fragment>}
            
            {part === 'career-login' && <Fragment>
        <ThemeProvider theme={theme}>
        <Flex wrap={'none'} style={{flexDirection:"column"}} >
        {inputs.map((field, index) => <TextField
        id={`outlined-secondary-${index}`}
        key = {index}
        label={`${field[0]}`}
        variant="outlined"
        color="primary"
        margin="normal"
        name={field[0]}
        value = {field[1]}
        type={(field[0] === 'Password')?field[0].toLowerCase():""}
        onChange = {(e) => ChangeHandler(e, setLoginFields, loginFields)}
        fullWidth/>
        )}
            </Flex>
            </ThemeProvider>
        </Fragment>}
        {part==="signup" && <Fragment>
            <Flex wrap={'none'} style={{flexDirection:"column"}} >
        {inputs.slice(0).map((field, index) => 
        field[0]!=='Specialisation'?<TextField
        id={`outlined-secondary-${index}`}
        error = {field[0]!=='Area'?validations[`${field[0]}`].status:false}
        helperText = {field[0]!=='Area'?validations[`${field[0]}`].msg:false}
        key = {index}
        label={`${field[0]}`}
        variant="outlined"
        color="primary"
        margin="normal"
        name={field[0]}
        value = {field[1]}
        type={(field[0] === 'Password')?field[0].toLowerCase():""}
        onChange = {(e) => ChangeHandler(e, setCreateProfile, createProfile)}
        fullWidth/>:"")}</Flex>            
            </Fragment>}
        {part==="login" && <Fragment>
            <Flex wrap={'none'} style={{flexDirection:"column"}} >
        {inputs.slice(0).map((field, index) => 
        <TextField
        id={`outlined-secondary-${index}`}
        error = {validations[`${field[0]}`].status}
        helperText = {validations[`${field[0]}`].msg}
        key = {index}
        label={`${field[0]}`}
        variant="outlined"
        color="primary"
        margin="normal"
        name={field[0]}
        value = {field[1]}
        type={(field[0] === 'Password')?field[0].toLowerCase():""}
        onChange = {(e) => ChangeHandler(e, setLoginFields, loginFields)}
        fullWidth/>)}</Flex>            
            </Fragment>}
        </Fragment>
    )
}


//menu-item should be in list item

