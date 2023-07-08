import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { FormControl, FormLabel } from '@chakra-ui/react';

const PhoneNumberInput = () => {
    const [value, setValue] = useState('');

    const handleOnChange = (inputValue) => {
        setValue(inputValue);
    };

    return (
        <FormControl gridColumn="1 / span 2" style={{

        }}>
            <FormLabel>Gsm</FormLabel>
            <PhoneInput
                placeholder="Telefon"
                defaultCountry="TR"
                value={value}
                style={{
                    width: '100%',
                    padding: '0.375rem 0.75rem',
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: 'black',
                    backgroundColor: 'white',
                    border: '1px solid #CBD5E0',
                    borderRadius: '0.25rem',
                }}
                containerstyle={{
                    width: '100%',
                    border: '1px solid #CBD5E0',
                    borderRadius: '0.25rem',
                }}
                onChange={handleOnChange}
            />
        </FormControl>
    );
};

export default PhoneNumberInput;
