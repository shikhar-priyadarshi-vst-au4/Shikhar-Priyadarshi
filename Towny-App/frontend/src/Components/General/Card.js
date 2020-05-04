import React, { Fragment, useState } from 'react';
import { makeStyles,
         Paper} from '@material-ui/core';
import { Text, CardImage, Flex } from '../Styled/Styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const useStyle = makeStyles((theme) => ({
    card : {
        margin : theme.spacing(2),
        padding : theme.spacing(0),
        borderRadius : '0.5em',
        cursor : 'pointer',
    }
}))



export const Card = (props) => {
    
    const classes = useStyle();
    let [elevation, setElevation] = useState(1);
    const { name, service_id, part, title, body, icon } = props;
    
    return(
        <Fragment>
        { part === 'homepage-section' && name && <Link to = {`/booking/${service_id}`} style={{textDecoration : "none"}}><Paper 
        elevation={elevation} onMouseOver={()=>setElevation(8)} 
        onMouseOut={()=>setElevation(1)}
        className={classes.card}>
              <CardImage src={`images/${name.concat(name==='Salon'?"":"s")}.jpg`} />
              <Text size={'1em'} sm_size={'1em'} weight={'400'} 
              cursor = {'pointer'}
              fontcolor={'#63686e'} padding={'0.8em'} sm_padding={'0.8em'}>{name}</Text>
              </Paper></Link>   }

        { part === 'homepage-section_quality' && <Paper variant="outlined"
          className={classes.card}>
            <Flex wrap={'none'} sm_wrap={'none'}>
                <FontAwesomeIcon icon={icon} 
                style={{margin:"0.5em 1em"}}
                size={'3x'}/>
                <div style={{margin:"1em 0.5em"}}>
                    <Text size={'1em'} sm_weight={'600'} sm_size={'1em'} 
                    weight={'500'} fontcolor={'#63686e'} padding={'0.4em'} sm_padding={'0.4em'}>{title}</Text>
                    <Text size={'1em'} 
                    sm_weight={'200'}  sm_size={'1em'}
                    weight={'200'} fontcolor={'#63686e'} padding={'0.4em'} sm_padding={'0.4em'}>{body}</Text>
                </div>
            </Flex>
            </Paper>}
            { part==='dashboard-ticket-matrix' && <Paper variant={'outlined'}  className={classes.card}>
                    <Flex alignItems={'center'} wrap={'no-wrap'}
                    style={{flexDirection:'column'}}>
                    <Text>No. of Tickets</Text>
                    <Text size={'4em'}>{props.value}</Text>
                    <Text>Accepted</Text>
                    <Text size={'4em'}>{props.value}</Text>
                    <Text>Declined</Text>
                    <Text size={'4em'}>{props.value}</Text>
                    </Flex>
                </Paper>}
            { part === 'dashboard-ticket-list' && <Paper
            className={classes.card}
            variant={'outlined'}>
                <Text>Ticket Bucket</Text>
                </Paper>}             
        </Fragment>
    )
} 