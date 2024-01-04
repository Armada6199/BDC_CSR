import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function CustomDatePicker({title,disabled,value}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{padding:'0'}}  components={['DatePicker']}>
        <DatePicker defaultValue={dayjs(value)} disabled={disabled} sx={{width:'100%',height: "60px"}} label={title}  />
      </DemoContainer>
    </LocalizationProvider>
  );
}
