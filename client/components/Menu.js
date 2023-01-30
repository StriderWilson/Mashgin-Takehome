import React, { useState } from 'react';

import {
    StyledBackButton,
    StyledButton,
    StyledContainer,
    StyledImage,
    StyledInput,
    StyledButtonWrapper,
    StyledName,
    StyledMenuItem,
} from './styled-components/Menu-styles.js';

const Menu = ({ category, menu, setCart, setPage }) => {
    const [quantities, setQuantities] = useState({});

    const handleAddToCart = (e) => {
        const id = e.target.id;
        const itemQuantity = parseInt(quantities[id]);
        setCart((previous) => {
            const prevQuantity = previous[id] ?
                parseInt(previous[id].quantity) : null;

            return {
                ...previous,
                [e.target.id]: prevQuantity ?
                    { quantity: (prevQuantity + itemQuantity) } :
                    { quantity: itemQuantity }
            };
        });
        setQuantities((prevState) => ({
            ...prevState,
            [id]: 0,
        }))
    };

    const handleBackToMain = () => {
        setPage('main');
    };

    const handleSetQuantities = (e) => {
        setQuantities((previous) => ({
            ...previous,
            [e.target.id]: e.target.value
        }));
    };

    return (
        <StyledContainer>
            <StyledBackButton onClick={handleBackToMain} variant="outlined">Back to main</StyledBackButton>
            {menu.filter((item) => item.category_id === category).map((item) => {
                return (
                    <div key={item.id}>
                        <StyledMenuItem>
                            <StyledImage src={`./images/${item.image_id}.jpg`} />
                            <StyledName>
                                <span>{item.name}: </span>
                                <span>${item.price}</span>
                            </StyledName>
                        </StyledMenuItem>
                        <div style={{ textAlign: 'center' }}>
                            <StyledButtonWrapper>
                                <StyledInput
                                    id={item.id}
                                    onChange={handleSetQuantities}
                                    min="0"
                                    type="number"
                                    value={quantities[item.id] ? quantities[item.id] : 0}
                                />
                                <StyledButton
                                    onClick={handleAddToCart}
                                    id={item.id}
                                >
                                    Add to cart
                                </StyledButton>
                            </StyledButtonWrapper>
                        </div>
                    </div>
                );
            })}
        </StyledContainer>
    );
};

export default Menu;
