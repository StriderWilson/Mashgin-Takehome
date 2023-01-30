
import Alert from '@mui/material/Alert';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Cart from './Cart.js';
import MainMenu from './MainMenu.js';
import Menu from './Menu.js';
import {
  StyledCart,
  StyledWrapper
} from './styled-components/App-styles.js';

const App = () => {
  const [cart, setCart] = useState({});
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(false);
  const [menu, setMenu] = useState(null);
  const [page, setPage] = useState('main');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios.get('/menu')
      .then((response) =>{
          setMenu(response.data.items);
          setCategories(response.data.categories);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, []);

  if (error) {
    return (
      <StyledWrapper>
        <Alert severity='error'>Request failed. Please reload page to try again.</Alert>
      </StyledWrapper>
    )
  }

  return (
    <StyledWrapper className="App">
      <StyledCart >
        <Cart cart={cart} menu={menu} setCart={setCart} />
      </StyledCart>
      {categories && page === 'main' && 
        <MainMenu 
          categories={categories} 
          setCategory={setSelectedCategory} 
          setPage={setPage}
        />}
      {menu && page === 'menu' &&
        <Menu 
          category={selectedCategory}
          menu={menu}
          setCart={setCart}
          setPage={setPage}
        />}
    </StyledWrapper>
  );
}

export default App;
