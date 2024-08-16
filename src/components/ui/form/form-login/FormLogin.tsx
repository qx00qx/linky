import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import styles from './Form.module.scss'
import React, { useState } from 'react';

interface FormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
}

const Form: React.FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  return (
    <form className={styles.form}>
      <FormControl className={styles.email}>
        <FormLabel>Email</FormLabel>
        <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
      </FormControl>
      <FormControl className={styles.password}>
        <FormLabel>Password</FormLabel>
        <Input type='password' value={pass} onChange={(e) => setPass(e.target.value)} />
      </FormControl>
      <Button onClick={() => handleClick(email, pass)}>{title}</Button>
    </form>
  );
}

export default Form;
