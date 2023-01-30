import React, { useEffect } from 'react';
import {
    StyledContainer,
    StyledInput,
    StyledLabel,
} from './styled-components/Checkout-styles';

const Checkout = ({ setFormData, total }) => {
    useEffect(() => {
        setFormData({ total });
    }, [total]);

    const handleChange = (e) => {
        setFormData((previousForm) => ({
            ...previousForm,
            [e.target.id]: e.target.value,
        }));
    };

    return (
        <StyledContainer>
            <StyledLabel>
                Your Name:
                <StyledInput autoComplete='name' id='name' onChange={handleChange} type='text' />
            </StyledLabel>
            <StyledLabel>
                Email:
                <StyledInput autoComplete='email' id='email' onChange={handleChange} type='email' />
            </StyledLabel>
            <StyledLabel>
                Credit Card Number:
                <StyledInput
                    autoComplete="cc-number"
                    id='credit'
                    inputMode="numeric"
                    maxLength="19"
                    onChange={handleChange}
                    pattern="[0-9\s]{13,19}"
                    placeholder="xxxx xxxx xxxx xxxx"
                    type="tel"
                />
            </StyledLabel>
            <StyledLabel>
                Expiration date:
                <StyledInput id='expiration' onChange={handleChange} type='month' />
            </StyledLabel >
            <StyledLabel>
                Zip code:
                <StyledInput autoComplete='zip-code' id="zip" onChange={handleChange} pattern="[0-9]*" type="text" />
            </StyledLabel>
            <h2>Total: ${total}</ h2> 
         </StyledContainer>
    )
};

export default Checkout;
