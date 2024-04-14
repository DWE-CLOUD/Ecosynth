import React from 'react';
import Button from './Button';
import './HomeButton.css'

export default function HomeButton(props) {
  const handleClick = () => {
    if(props.setDisplayFilteredDownload) props.setDisplayFilteredDownload(false);
    else if(props.setDisplaySearchOptions) props.setDisplaySearchOptions(false);
    else if(props.setDisplaySimpleDownload) props.setDisplaySimpleDownload(false);
  }
  
    return (
        <div id="home-button-container">
            <Button handleClick={handleClick}> Home </Button>
        </div>
    )
}