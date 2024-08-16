import { Button } from '@chakra-ui/react';
import styles from './Form.module.scss'
import React, { useState } from 'react';
import InputField from '@components/ui/input-field/InputField';

interface FormProps {
  title: string;
  handleClick: (email: string, pass: string, username: string) => void;
}

const Form: React.FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [username, setUsername] = useState('')

  const handleSubmit = (email: string, pass: string, username: string) => {
    if (pass !== confirmPass) {
      alert('Passwords do not match')
      return
    }
    handleClick(email, pass, username)
  }

  return (
    <form className={styles.form}>
        <InputField
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value)}}
          label='Email address'
          type="email"
          isRequired
        />
        <InputField
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setUsername(event.target.value)}}
          label='Username'
          type="name"
          isRequired
        />
        <InputField
          value={pass}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPass(event.target.value)}}
          label='Password'
          type="password"
          isRequired
        />
        <InputField
          value={confirmPass}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setConfirmPass(event.target.value)}}
          label='Confirm Password'
          type="password"
          isRequired
        />
      <Button onClick={() => handleSubmit(email, pass, username)}>{title}</Button>
    </form>
  );
}

export default Form;
