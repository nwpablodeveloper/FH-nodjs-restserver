const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client();

async function googleVerify( tokenGoogle = '' ) {

    const ticket = await client.verifyIdToken({
        idToken: tokenGoogle,
        audience: process.env.GOOGLE_CLIENT_ID, 
        
    });

    // Recibo toda la info del usuario desde Google
    // console.log(ticket.getPayload());

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