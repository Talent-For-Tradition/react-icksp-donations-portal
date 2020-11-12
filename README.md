# react-icksp-donations-portal
requires [NodeJS](https://nodejs.org/en/)


install/upgrade yarn global binary:
    
    npm install -G yarn

clone this repo

    git clone https://github.com/Talent-For-Tradition/react-icksp-payment-portal
    

install dependencies

    cd react-icksp-payment-portal
    yarn install


start the app

    yarn start


create an optimized production build

    yarn build

#
## development
#

- environment variables
```
REACT_APP_AUTH0_DOMAIN=
REACT_APP_AUTH0_CLIENT_ID=
REACT_APP_STRIPE_PK=
REACT_APP_BASE_URL=
```
- REACT_ACT_BASE_URL points to deployed API
- find the missing values @ Auth0 and Stripe

