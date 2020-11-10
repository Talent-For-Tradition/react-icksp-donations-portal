# react-icksp-payment-portal
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
REACT_APP_STRIPE_SK=
BASE_URL=https://localhost:5000
SECRET_KEY=
DATABASE=postgresql://icksp:logos@localhost:5432/icksp
```
- find the missing values @ Auth0 and Stripe
- SECRET_KEY is REACT_APP_STRIPE_SK

during development, you may wish to run the app & api concurrently.

to do so without opening another window,

    yarn develop
