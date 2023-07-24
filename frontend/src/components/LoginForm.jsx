import React, {useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

/**
 * Using here Formik to for form handling
 * Implemented yup with formik to validate fields
 */

const LoginForm = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    localStorage.removeItem("token")
  },[]);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Handled login logic
      axios.post("http://localhost:5000/api/auth/login", values).then((res)=> {
        console.log("Response**", res);
          localStorage.setItem("token", res?.data?.token)
          if(res?.data?.token){
           navigate("/dashboard");
          }else{
            alert(res?.data?.message)
          }
        });
    },
  });

  return (
    <Container 
      component="main" 
      maxWidth="xs" 
      >
      <Box
        sx={{display: "flex", flexDirection:"column", justifyContent:"center"}}
      >
      <Typography sx={{marginTop:"10px"}} component="h1" variant="h5">
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{marginTop:"10px"}}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{marginTop:"10px"}}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{marginTop:"10px"}}
        >
          Sign In
        </Button>
      </form>
      </Box>
    </Container>
  );
};

export default LoginForm;