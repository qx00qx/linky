import { FormControl } from '@chakra-ui/react';
import InputField from '@components/ui/input-field/InputField';
import React, { useState } from 'react';

interface AddNewSocialsProps {
    label: string
    value: string
    setSocialUrl: (socialUrl: string) => void
}

const AddNewSocials: React.FC<AddNewSocialsProps> = ({label, value, setSocialUrl}) => {
    const [link, setLink] = useState(value);

    const onChangeLink = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
        setSocialUrl(event.target.value)
    }
    
    return (
        <FormControl>
            <InputField 
                label={label}
                type={'text'} 
                value={link}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeLink(event)} />
        </FormControl>
    );
}

export default AddNewSocials;
