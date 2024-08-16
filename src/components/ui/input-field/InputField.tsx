import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

type InputFieldProps = {
    label: string,
    type: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

type InputFieldRestProps = React.ComponentProps<typeof FormControl>;

const InputField: React.FC<InputFieldProps & InputFieldRestProps> = ({ label, type, value, onChange, ...rest }) => {
    return (
        <FormControl {...rest}>
            <FormLabel>{label}</FormLabel>
            <Input maxWidth={'500px'}
                   type={type}
                   value={value} 
                   onChange={onChange}/>
        </FormControl>
    );
}

export default InputField;
