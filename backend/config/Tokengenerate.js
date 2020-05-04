const jwt = require( 'jsonwebtoken');
const Secret = "Express";



//GENERATE TOKEN - 
const tokenGenerator = id => {
    let Token = jwt.sign( {  sub : id }, Secret, { expiresIn : '2h'});
    return Token;
}

const tokenValidator = token => {
    try {
        let decoded = jwt.verify(token, Secret);
        console.log(decoded);  
    } catch(err) {
        console.log(err.message);
      }
}
module.exports = {
    tokenGenerator,
    tokenValidator
};
//JWT.SIGN(PAYLOAD, SECRET KEY OR PRIVATE KEY , [OPTIONS,CALLBACKFN]);