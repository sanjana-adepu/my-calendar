import React from 'react'
import {TextField,InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  return (
    <TextField
              fullWidth
              placeholder="Search"
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
  )
}
