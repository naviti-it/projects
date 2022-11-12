import React, { useState } from 'react';
import Menu from './Menu';
import Categories from './Categories';
import items from './data';

const allCategoties = ['all', ...new Set(items.map((item)=> item.category))];

function App() {
  const[menuItems, setMenuItems] = useState(items);
  const[categories, setCategories] = useState(allCategoties);

  const filterItems = (category) => {
    if(category === 'all'){
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  }

  return(
  <main>
    <section className='container'>
      <div className='title'>
        <h2>oue menu</h2>
        <div className='underline'></div>
      </div>
      <Categories filterItems= {filterItems} categories={categories}/>
      <Menu items = {menuItems}/>
    </section>
  </main>
  )
}

export default App;
