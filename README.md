# currency-converter-system
- Currency cnverter system is providing the well authentication system on the first hand and then it will route us to currency converter system after successfull authentication.
- In Currency converter system you can see the complete basic detail of countries as `Population`, `Official name`, `symbol`, `currency` and current currency value comparatively `EURO`
- User can easily get local currency conversion and best thing is that user can list the countries and get all countries currency conversion values in one time
# How to run project:
- You will have to install node_module in both directories as `frontend` and `backend`
1. Backend command: `npm run dev`
2. Frontend command: `npm start`

# How Authentication work?
- There are using two fields `Email` and `Password`. 
- You cannot enter to the currency converter system without login. When user enter email and password first time it save this in `MongoDB`. 
- You will not be able to login second time with different password and same email.
- Component are wrap up with `Protected route` which means it will check the token and verify it and then allow to navigate other components

# What if user is not using MongoDB?
- I have added two static user on the base of you can perform Login. The static user details given below:
1. Email: `testinguser1@gmail.com` , Password: `user1`
2. Email: `testinguser2@gmail.com` , Password: `user2`

# Project details:
### Serer side language:
- Node-JS

### Client side language:
- React-JS

### Databse:
- MongoDB

### UI Framework:
- Material UI

### External libraries:
- Formik
- Yup
- Material Table
