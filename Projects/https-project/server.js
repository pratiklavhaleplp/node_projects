const fs = require('fs');
const https = require('https');
const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');


require('dotenv').config();
const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRETE: process.env.CLIENT_SECRETE
}

function verifyCallBack(accessToken, refreshToken, profile, done) {
  console.log('Google Profile : ', profile);
  done(null, profile);
}
passport.use(new Strategy({
  callbackURL: '/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRETE
}, verifyCallBack))


const app = express();

// middlewares..
app.use(passport.initialize());


let isLoggedIn = false;
function checkLoggedIN(req, res, next) {
  if (!isLoggedIn) {
    return res.status(401).json({
      error: 'You must log in'
    });
  }
  next();
}

app.get('/auth/google/', passport.authenticate('google', {
  scope: ['email', 'profile']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/fail',
  sucessRedirect: '/user/authentication',
  session: false
}), (req, res) => {
  isLoggedIn = true;
  console.log('Goodle called us back...');
  res.send('Goodle called us back...');
});

app.get('/auth/logout', (req, res) => {

});

app.get('fail', (req, res) => {
  res.send(`<h1>Failed to send...</h1>`)
})

app.get('/user/authentication', (req, res) => {
  console.log(req.params.id);
  res.send(`<h1>Authenticate here...</h1>
    <a href='/secret'>Show me..</a>
    <a href='/auth/google'>Google login..</a>
    <a href='/auth/logout'>Sign out..</a>`);
});

app.get('/secret', checkLoggedIN, (req, res) => {
  res.send('your secrete value is 42');
})
// we can pass key and cert = certificate values through which we can encrypt the data.
// and for getting that cer and key we are going to use openSSL(this is the open source tool)
// with the help of SSL we are going to generate self-signed certificate.

// req-> specifies we are requesting to generate certificate
// -x509 specifies that it's a self signed certificate
// - newKey contains secretes of encryption this is the provate key which uses RSA encryption format
// rsa is the encryption algorithm 
// 4096 shows that size of key in bits
// .pem is the common format for certificates
// key.pem is private and cert.pem which is our certificate which will be public.
// -days 365 shows that how many days this certificate will be valid.
// openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365 

// whome so ever has the key can encrypt the data on the server
// certificates allows us to decrypt the data which got generated with the help of key. that's what the broser will do
// this concept is public key cryptography
// when you click Advanced in the browser we are telling browser that go ahead 
// i'm ok with the certificate i know this is a valid endpoint/ we trust this server
// in the developer tools you still will have response but any hacker who is in the network will not 
// be able to see the details. they will get bits i.e 0's and 1's

https.createServer({
  cert: fs.readFileSync('cert.pem'),
  key: fs.readFileSync('key.pem')
}, app).listen(3000, () => {
  console.log("app started listening on 3000");
})