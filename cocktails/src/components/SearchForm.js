import React, {useRef, useEffect} from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
const searchValue = useRef('')
  const{setSearchTerm} = useGlobalContext();

  const searchCocktail = () =>{
    setSearchTerm(searchValue.current.value)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
  }

  useEffect(()=>{
    searchValue.current.focus()
  },[])

  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>search your favorit cocktail</label>
          <input type='text' id='name' ref={searchValue}   onChange={searchCocktail} />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
