# bran.name - Node.js server implementation

## Setup

First you need to clone the repo and install it's dependencies

```
git clone git@github.com:branneman/bran.name-server.git
cd bran.name-server
npm install
```

Secondly you'll need to generate a self-signed SSL certificate with OpenSSL (you'll need to provide some dummy details):

```
mkdir cert
openssl req -x509 -newkey rsa:4096 -keyout cert/key.pem -out cert/cert.pem -days 365 -nodes
```

Then you'll need to create a `.env` file with your Contentful configuration:

```
CONTENTFUL_HOST="cdn.contentful.com"
CONTENTFUL_SPACE=""
CONTENTFUL_ACCESSTOKEN=""
CONTENTFUL_HOOK_AUTH_USER=""
CONTENTFUL_HOOK_AUTH_PASS=""
```

Lastly you can start your server:

```
npm start
```

And then point your browser to: https://localhost:8443/

Since the SSL certificate is self-signed, your browser probably won't trust it by default. If you don't expose your
server to anything other than local machine, you can safely create an exception for the site.
