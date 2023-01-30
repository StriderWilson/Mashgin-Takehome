import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { StyledInput } from './styled-components/Menu-styles';

const CartTable = ({ cart, menu, setCart, setTotal, total, totalQuantity }) => {
  const [rows, setRows] = useState([]);

  const handleRemove = (e) => {
    const id = e.target.id;
    setCart((prevCart) => {
      const tempCart = prevCart;
      delete tempCart[id];

      return {
        ...tempCart
      };
    })
  };

  const handleSetQuantities = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    setCart(prevCart => ({
      ...prevCart,
      [id]: { quantity: parseInt(value) },
    }))
  }

  useEffect(() => {
    setRows(Object.keys(cart).map((itemId) => {
          const menuItem = menu.find(({ id }) => id === parseInt(itemId));

          return ({
            id: itemId,
            name: menuItem.name,
            quantity: cart[itemId].quantity,
            price: menuItem.price,
          })
      }))
    
    setTotal(() => {
      const totals = Object.keys(cart).map(itemId => {
        const menuItem = menu.find(({id}) => id === parseInt(itemId));

        return parseInt(cart[itemId].quantity) * parseFloat(menuItem.price);
      });

      return totals.reduce((a, b) => a + b, 0);

      })
  }, [cart])

  return (
    <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <StyledInput
                  id={row.id}
                  onChange={handleSetQuantities}
                  min="0"
                  type="number"
                  value={cart[row.id] ? cart[row.id].quantity : 0}
                />
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell>                
                <button onClick={handleRemove} id={row.id} >
                  Remove
                </button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell align="right">{totalQuantity}</TableCell>
            <TableCell align="right">{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CartTable;
