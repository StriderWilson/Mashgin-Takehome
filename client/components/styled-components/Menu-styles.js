import styled from 'styled-components';
import Button from '@mui/material/Button';

export const StyledButton = styled.button`
    margin-left: 10px;
`;

export const StyledBackButton = styled(Button)`
    position: absolute !important;
    left: 20px;
    top: 10px;
`;

export const StyledButtonWrapper = styled.div`
    display: inline-block; 
`;

export const StyledContainer = styled.div`
    display: flex;
`;

export const StyledImage = styled.img`
    position: relative;
    left: 50%;
    top: 44%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
`;

export const StyledInput = styled.input`
    width: 40px;
`;

export const StyledMenuItem = styled.div`
    position: relative;
    margin: 10px;
    border: 2px solid;
    border-radius: 2px;
    width: 250px;
    height: 250px;
`;

export const StyledName = styled.h2`
    position: absolute;
    text-align: center;
    width: 100%;
    left: 50%;
    top: 80%;
    transform: translate(-50%, -50%);
`;

export const StyledCategory = styled.div`
    cursor: pointer;
    position: relative;
    margin: 10px;
    border: 2px solid;
    border-radius: 2px;
    width: 250px;
    height: 250px;

    &:hover {
        border: 3px solid blue;
    }
`;