const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client();

async function googleVerify( tokenGoogle = '' ) {

    const ticket = await client.verifyIdToken({
        idToken: tokenGoogle,
        audience: process.env.GOOGLE_CLIENT_ID, 
        
    });

    const { email, name, picture } = ticket.getPayload();
    
    return {
        correo: email,
        nombre: name,
        img: picture
    }

}


module.exports = {
    googleVerify
}