import Button from './components/Button'
import './App.css';
import FilteredDownload from './components/FilteredDownload'
import SearchOptions from './components/SearchOptions';
import MainForm from './components/Home'
import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import SimpleDownload from './components/SimpleDownload';

function App() {
  const [color, setColor] = useState('monochrome');
  const [license, setLicense] = useState('any');
  const [safeSearch, setSafeSearch] = useState(false);
  const [searchText, setSearchText] = useState('')
  const [quantity, setQuantity] = useState('')

  useEffect(() => {
    console.log(color, license, safeSearch)
  }, [color, license, safeSearch])

  // routing
  const [displaySearchOptions, setDisplaySearchOptions] = useState(false);
  const [displayFilteredDownload, setDisplayFilteredDownload] = useState(false);
  const [displaySimpleDownload, setDisplaySimpleDownload] = useState(false);

  const handleSearchOptions = () => {
    setDisplaySearchOptions(true);
  };

  if(displayFilteredDownload) {
    return (<FilteredDownload 
              setDisplayFilteredDownload={setDisplayFilteredDownload}
              searchText={searchText}
              safeSearch={safeSearch}
              quantity={quantity}
              color={color}
              license={license}
            />);
  }
  else if(displaySimpleDownload)
    return (<SimpleDownload 
              setDisplaySimpleDownload={setDisplaySimpleDownload}
              searchText={searchText}
              safeSearch={safeSearch}
              quantity={quantity}
              color={color}
              license={license}
            />);
  else if(displaySearchOptions)
    return (
      <SearchOptions 
        setColor={setColor}
        setLicense={setLicense}
        setSafeSearch={setSafeSearch}
        setDisplaySearchOptions={setDisplaySearchOptions}
      />
    );
  else  
    return (
      <Home 
        handleSearchOptions={handleSearchOptions}
        setDisplayFilteredDownload={setDisplayFilteredDownload}
        setDisplaySimpleDownload={setDisplaySimpleDownload}
        safeSearch={safeSearch}
        setSearchText={setSearchText}
        searchText={searchText}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    );
}

export default App;