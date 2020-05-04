import {HOST, PORT} from './links';
export const FetchAPI = async (LINK, {METHOD, VALUE} , cb) => {
    let OPTION = OPTIONS(METHOD, VALUE); 
    try{
        let data = await (await fetch(`http://${HOST}:${PORT}${LINK}`, OPTION)).json();        
        if(data){
            return cb (null, data);
        }
      }
      catch(error){
          return cb(error, null)
      }
}

const OPTIONS = (METHOD, VALUE) => {
    if(METHOD === 'GET'){
        return ({ method : `${METHOD}`})
    }
    return ({
        method : `${METHOD}`,
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(VALUE)
    })
}