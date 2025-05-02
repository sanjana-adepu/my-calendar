import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Registered({ selectedValue, onRadioChange }) {
  return (
    <FormControlLabel
      control={
        <Switch 
          color="primary" 
          checked={selectedValue === 'a'} 
          onChange={onRadioChange} 
        />
      }
      label="Registered Events only"
      labelPlacement="end"
    />
  );
}