import "./SearchOptions.css"
import React, { useEffect} from 'react';
import Button from './Button';

const colors = [
    'color', 
    'Monochrome', 
    'Red', 
    'Orange', 
    'Yellow', 
    'Green', 
    'Blue', 
    'Purple', 
    'Pink', 
    'Brown', 
    'Black', 
    'Gray', 
    'Teal', 
    'White'
];

const licenses = [
    'any', 
    'Public', 
    'Share', 
    'ShareCommercially', 
    'Modify', 
    'ModifyCommercially' 
];

function Select(props) {
    return (
        <div>
            <label>
                { props.name }
            </label>
            <select onChange={props.onChange} name={props.name}>
                {props.items.map(item => 
                    <option key={item}>{item}</option>
                )}
            </select>
        </div>
    );
}

export default function SearchOptions(props) {
    const handleColorChange = (event) => {
        props.setColor(event.target.value);
    };

    const handleLicenseChange = (event) => {
        props.setLicense(event.target.value);
    };

    const handleSafeSearchChange = (event) => {
        props.setSafeSearch(event.target.value);
    };

    const onApplyButtonClick = () => {
        props.setDisplaySearchOptions(false);
    };

    return (
        <div id="container">
            <form id="search-options-form">
                <div id="select-containers">
                    <Select 
                        name="Color: "
                        onChange={handleColorChange}
                        items={colors}
                    />
                    <Select 
                        name="License: "
                        onChange={handleLicenseChange}
                        items={licenses}
                    />
                    <div label="safe-search">
                        <label>
                            Safe Search:
                        </label>
                        <select onChange={handleSafeSearchChange} 
                                name="Safe search">
                            <option key="yes">yes</option>
                            <option key="no">no</option>
                        </select>
                    </div>
                </div>
                <div id="button-container">
                    <Button handleClick={onApplyButtonClick}>
                        Apply
                    </Button>
                </div>
            </form>
        </div>
    );
};