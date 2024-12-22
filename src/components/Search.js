import React, { useContext } from 'react'
import { GrFormSearch } from "react-icons/gr";
import MainContext from '../MainContext';

function Search() {
  const {searchi, setSearch} = useContext(MainContext)
  return (
    <div className='search'>
         <div className='icon'>
         <GrFormSearch />
         </div>
         <input type='text' onChange={e => setSearch(e.target.value)} placeholder='Search Brands'/>
    </div>
  )
}

export default Search
