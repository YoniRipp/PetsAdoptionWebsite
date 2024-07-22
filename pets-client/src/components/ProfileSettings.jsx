import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { AuthContext } from '../context/AuthProvider';

function ProfileSettings() {
  const { user, isUserLoading } = useContext(AuthContext);
  const { editUser, getUserbyID } = useContext(UserContext);
  const { id } = useParams(); 

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const userData = await getUserbyID(id);
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email);
          setPhone(userData.phone);
          setBio(userData.bio);
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      }
    };

    fetchUserData();
  }, [id, getUserbyID]);

  const handleSave = async (e) => {
    e.preventDefault();

    const editedUser = {
      firstName,
      lastName,
      email,
      phone,
      password,
      rePassword,
      bio,
    };

    try {
      await editUser(id, editedUser);
    } catch (err) {
      console.log(err);
    }
  };

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1 className='d-6 font-weight-normal'>Profile Settings</h1>
      <Form onSubmit={handleSave}>
        <Form.Group className='mb-3' controlId='formBasicFirstName'>
          <Form.Label className='font-weight-light'>First Name</Form.Label>
          <div className='inputData'>
            <Form.Control type='text' placeholder='First Name' onChange={(event) => setFirstName(event.target.value)} value={firstName} />
          </div>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicLastName'>
          <Form.Label className='font-weight-light'>Last Name</Form.Label>
          <div className='inputData'>
            <Form.Control type='text' placeholder='Last Name' onChange={(event) => setLastName(event.target.value)} value={lastName} />
          </div>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label className='font-weight-light'>Email address</Form.Label>
          <div className='inputData'>
            <Form.Control type='email' placeholder='Email' onChange={(event) => setEmail(event.target.value)} value={email} />
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
              onChange={(event) => setPassword(event.target.value)}
              required
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
              onChange={(event) => setRePassword(event.target.value)}
              required
            />
          </div>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicBio'>
          <Form.Label className='font-weight-light'>Bio</Form.Label>
          <div className='inputData'>
            <Form.Control
              type='text'
              placeholder='Short Bio'
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </div>
        </Form.Group>
        <div className='d-flex flex-row-reverse'>
          <Button variant='primary' type='submit' className=''>
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default ProfileSettings;
