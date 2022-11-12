import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  const list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  return [];
}

function App() {
  const [name, setName] = useState('');
  const[alert, setAlert] = useState ({show: false, msg: '', type: ''});
  const[isEditing, setIsEditing] = useState(false);
  const[list, setList]= useState(getLocalStorage());
  const[editID, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      /* show alert  */
      showAlert(true, 'danger', 'please enter value');
    }
    else if (name && isEditing) {
setList(list.map((item)=>{
  if(item.id === editID){
    return {...item, title: name}
  }
  return item
}))
setName('');
setEditID(null);
setIsEditing(false);
setAlert(true, 'success', 'value changed');
    } else {
      showAlert(true, 'success', 'item added to the list');

      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  }

  const clearlist = () =>{
    showAlert(true, 'danger', 'empty list');
    setList([]);
  }

  const removeItem = (id) =>{
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({show, type, msg});
  }

  const editItem = (id) =>{
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  useEffect(()=>{
localStorage.setItem('list', JSON.stringify(list));
  },[list])

  return <section className='section-center'>
    <form onSubmit={handleSubmit} className='grocery-form'>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3> grocery bud</h3>
      <div className='form-control'>
        <input type="text" 
        value={name} 
        onChange={((e)=>setName(e.target.value))} 
        className='grocery' placeholder='e.g  eggs'/>
        <button type='submit' className='submit-btn'>{isEditing? 'edit': 'sumbit'}</button>
      </div>
    </form>
      {list.length > 0 && (<div className='grocery-container'>
      <List items={list} removeItem={removeItem} editItem ={editItem}/>
      <button className='clear-btn' onClick={clearlist}>clear-items</button>
    </div>
)}
  </section>
}

export default App
