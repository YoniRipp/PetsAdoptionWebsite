import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      password,
      rePassword
    };

    try {
      const res = await axios.post('http://localhost:8080/users/signup', newUser);
      if (res.data.ok) {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <h1 className='d-6 font-weight-normal'>Sign-Up</h1>
      <Form onSubmit={handleSignUp}>
        <Form.Group className='mb-3' controlId='formBasicFirstName'>
          <Form.Label className='font-weight-light'>First Name</Form.Label>
          <div className='inputData'>
            <Form.Control type='text' placeholder='First Name' onChange={(event) => setFirstName(event.target.value)} value={firstName} required/>
          </div>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicLastName'>
          <Form.Label className='font-weight-light'>Last Name</Form.Label>
          <div className='inputData'>
            <Form.Control type='text' placeholder='Last Name' onChange={(event) => setLastName(event.target.value)} value={lastName} required/>
          </div>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label className='font-weight-light'>Email address</Form.Label>
          <div className='inputData'>
            <Form.Control type='email' placeholder='Email' onChange={(event) => setEmail(event.target.value)} value={email} required/>
          </div>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPhone'>
          <Form.Label className='font-weight-light'>Phone</Form.Label>
          <div className='inputData'>
            <Form.Control type='number' placeholder='Phone' onChange={(event) => setPhone(event.target.value)} value={phone} />
          </div>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label className='font-weight-light'>Password</Form.Label>
          <div className='inputData'>
            <Form.Control
              type='password'
              placeholder='Password'
              autoComplete='on'
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)
                
              }
            />
          </div>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicRePassword'>
          <Form.Label className='font-weight-light'>Repeat Password</Form.Label>
          <div className='inputData'>
            <Form.Control
              type='password'
              placeholder='Repeat Password'
              autoComplete='on'
              value={rePassword}
              required
              onChange={(event) => setRePassword(event.target.value)}
            />
          </div>
        </Form.Group>
        <div className='d-flex flex-row-reverse'>
          <Button variant='primary' type='submit' className=''>
            Sign Up
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Signup;
