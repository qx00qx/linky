import { Button } from '@chakra-ui/react';
import styles from './Form.module.scss'
import React, { useState } from 'react';
import InputField from '@components/ui/input-field/InputField';

interface FormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
}

const Form: React.FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  return (
    <form className={styles.form}>
      <InputField
         type='email'
         label='Email' 
         value={email} 
         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <InputField
         type='password'
         label='Password' 
         value={pass} 
         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
        />
      <Button onClick={() => handleClick(email, pass)}>{title}</Button>
    </form>
  );
}

export default Form;
