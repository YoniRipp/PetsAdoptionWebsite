import axios from 'axios';
import { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { checkStatus } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/users/login', { email, password }, { withCredentials: true });
      if (res.data.ok) {
        await checkStatus()
        navigate('/home');

      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <h1>Welcome to the pet adoption website</h1>
      <h3 className='d-6 font-weight-normal'>Login</h3>
      <Form onSubmit={handleLogin}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label className='font-weight-light'>
            Email address or <Link to='/signup'>Signup</Link>
          </Form.Label>
          <div className='inputData'>
            <Form.Control type='email' placeholder='Enter email' onChange={(event) => setEmail(event.target.value)} value={email} />
          </div>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label className='font-weight-light'>Password</Form.Label>
          <div className='inputData'>
            <Form.Control type='password' placeholder='Password' onChange={(event) => setPassword(event.target.value)} value={password} />
          </div>
        </Form.Group>
        <div className='d-flex flex-row-reverse test'>
          <Button variant='primary' type='submit'>
            Log In
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
