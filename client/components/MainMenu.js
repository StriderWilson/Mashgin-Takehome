import React from 'react';

import {
    StyledContainer,
    StyledImage,
    StyledCategory,
    StyledName,
} from './styled-components/Menu-styles.js';

const MainMenu = ({ categories, setCategory, setPage }) => {

    const handleClick = (e) => {
        setCategory(parseInt(e.currentTarget.getAttribute('value')));
        setPage('menu');
    };

    return (
        <StyledContainer>
            {
                categories.map((category) => {
                    return (
                        <StyledCategory onClick={handleClick} key={category.id} value={category.id} >
                            <StyledImage src={`./images/${category.image_id}.jpg`} />
                            <StyledName>
                                {category.name}
                            </StyledName>
                        </StyledCategory>
                    )
                })
            }
        </StyledContainer>
    )
};

export default MainMenu;
