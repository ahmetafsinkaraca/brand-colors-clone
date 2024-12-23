import './App.css';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import MainContext from './MainContext';
import { use, useEffect, useState } from 'react';
import BrandsData from './brands.json'
import Copied from './components/Copied';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Collection from './components/Collection';


function App() {

  const brandsArray = []
  Object.keys(BrandsData).map(key => {
    brandsArray.push(BrandsData[key])
  })

  const [brands, setBrands] = useState(brandsArray);
  const [selectedBrands, setSelectedBrands] = useState([])
  const [copied, setCopied] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log(selectedBrands);
  }, [selectedBrands]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false)
    }, 1000);
    return () => {
      clearTimeout(timeout)
    }
  })

  useEffect(() => {
    setBrands(brandsArray.filter(brand => brand.title.toLowerCase().includes(search)));
  }, [search])

  useEffect(() => {
		document.title = 'React BrandColors'
	}, [])

  const data = {
    brands,
    selectedBrands,
    setSelectedBrands,
    setCopied,
    search,
    setSearch
  }


  return (
    <>
      <MainContext.Provider value={data}>
        {copied && <Copied color={copied} />}
        <Sidebar />
        <Router>
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/collection/:slugs" element={<Collection />} />
          </Routes>
        </Router>
      </MainContext.Provider>
    </>
  );
}

export default App;
