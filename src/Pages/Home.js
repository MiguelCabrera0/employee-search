import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Home =()=> {
    const navigate = useNavigate();
  return (
    <Box>
        <p>Componente de Home</p>
        <Button onClick={()=>navigate("/Employees")}>Go to Employees</Button>
    </Box>
  )
}
