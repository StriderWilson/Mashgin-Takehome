import axios from 'axios';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import CartTable from './CartTable.js';
import Checkout from './Checkout.js';
import {
    StyledBackIcon
} from './styled-components/Checkout-styles.js'

const Cart = ({ cart, menu, setCart }) => {
    const [checkout, setCheckout] = useState(false)
    const [paymenError, setPaymentError] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [formData, setFormData] = useState({});
    const [open, setOpen] = useState(false);
    const [total, setTotal] = useState(0);

    const totalQuantity = Object.keys(cart)
        .map(id => parseInt(cart[id].quantity))
        .reduce((a, b) => parseInt(a) + parseInt(b), 0);

    const handleBack = () => {
        setCheckout(false);
        setPaymentSuccess(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCheckout(false);
        setPaymentSuccess(false);
    };

    const handleCheckout = () => {
        setCheckout(true);
    };

    const handleSubmitPayment = () => {
        axios.post('/payment', formData)
        .then((response) =>{
            console.log(response)
            setCart({});
            setFormData({});
            setPaymentError(false);
            setPaymentSuccess(true);
        })
        .catch((error) => {
            console.log(error);
            setPaymentError(true);
        });
    };

    return (
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
            <ShoppingCartIcon />
            ({totalQuantity})
        </Button>
        <Dialog open={open} onClose={handleClose}>
            {checkout && <StyledBackIcon onClick={handleBack} />}
            <DialogTitle>{!checkout ? 'Your Cart' : 'Checkout'}</DialogTitle>
            <DialogContent>
                {paymentSuccess ?
                    <Alert severity='success'>Your payment was successful!</Alert> : 
                        Object.keys(cart).length === 0 ? (
                            <DialogContentText>
                                Your cart is empty. Return to menu to add items.
                            </DialogContentText>) : 
                            (checkout ? <Checkout setFormData={setFormData} total={total} /> :
                                <CartTable
                                    cart={cart}
                                    menu={menu}
                                    setCart={setCart}
                                    total={total}
                                    setTotal={setTotal}
                                    totalQuantity={totalQuantity}
                                />
                            )
                }
                {paymenError && 
                    <Alert severity='error' >
                        Payment failed. Please check payment information and try again.
                    </Alert>
                }
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            {!!totalQuantity && <Button onClick={!checkout ? handleCheckout : handleSubmitPayment}>{!checkout ? 'Checkout' : 'Pay'}</Button>}
            </DialogActions>
        </Dialog>
        </div>
    );
}

export default Cart;