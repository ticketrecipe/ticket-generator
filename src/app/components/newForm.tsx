'use client';
/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid2';
import styles from './form.module.css'


export default function NewForm(props: any) {
    const [timeValue, setTimeValue] = React.useState<Dayjs | null>(null);
    const [dateValue, setDateValue] = React.useState<Dayjs | null>(null);
    const [state, setState] = React.useState({
        eventName: '',
        eventID:'',
        eventVenue: '',
        eventAddress:'',
        eventDateTime:'',
        patronName: '',
        section: '',
        cat:'',
        row: '',
        seats:'',
        price: '',
        currency:'',
        type:'',
        bid:'',
        bannerImageUrl: '',
        entrance:'TEST'
    })

    React.useEffect(()=> {
        if(props.onFormChange){
            props.onFormChange(state)
        }
    },[state])

  return (
    <React.Fragment>
      <Container fixed>
        <Box sx={{ bgcolor: '#FFFEFA',padding:5, border: '1px solid var(--Grey-3, #F0EDF1)', borderRadius: '20px' }}> 
            <h2>Fill in ticket </h2><br/>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Autocomplete
                        disablePortal
                        options={props.events ? props.events : []}
                        getOptionLabel={(option: any) => option.name}
                        onInputChange={(event, newInputValue) => {
                            console.log(event, newInputValue);
                        }}
                        onChange={(event, value) => {
                            if(value === null){
                                setState({
                                    eventName: '',
                                    eventID:'',
                                    eventVenue: '',
                                    eventDateTime:'',
                                    eventAddress:'',
                                    patronName: '',
                                    section: '',
                                    cat:'',
                                    row: '',
                                    seats:'',
                                    price: '',
                                    currency:'',
                                    type:'',
                                    bannerImageUrl: '',
                                    bid:'',
                                    entrance:'TEST'
                                })
                            }else{
                                setState({
                                    ...state,
                                    eventDateTime: value.eventDateTime,
                                    eventName: value.name,
                                    eventID:value.id,
                                    eventVenue: value.venueName,
                                    eventAddress:value.address,
                                    bannerImageUrl: value.bannerImageUrl
                                });
                                setDateValue(dayjs(value.eventDateTime))
                                setTimeValue(dayjs(value.eventDateTime))
                            }
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth label="Event" />}
                        />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker disabled value={dateValue /*dayjs('2025-11-02T20:00:00')*/} className={styles.fullWidth}/>  
                    </LocalizationProvider>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            disabled
                            className={styles.fullWidth}
                            value={timeValue}
                            onChange={setTimeValue}
                            defaultValue={timeValue /*dayjs('2025-11-02T20:00:00')*/}
                            referenceDate={dayjs('2025-11-02T20:00:00')}
                            />  
                    </LocalizationProvider>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        disabled
                        fullWidth
                        id="outlined-disabled"
                        label="Venue"
                        placeholder="Enter Venue"
                        value={state.eventVenue}
                        onChange={(e: any)=>setState({...state, eventVenue: e.currentTarget.value})}
                        />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        id="outlined-helperText"
                        label="Patron Name"
                        placeholder="Enter patron name"
                        value={state.patronName}
                        onChange={(e: any)=>setState({...state, patronName: e.currentTarget.value})}
                        //helperText="Some important text"
                        />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        id="outlined-helperText"
                        label="Section"
                        placeholder="Enter section"
                        value={state.section}
                        onChange={(e: any)=>setState({...state, section: e.currentTarget.value})}
                        //helperText="Some important text"
                        />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        id="outlined-helperText"
                        label="Row"
                        placeholder="Enter Row"
                        value={state.row}
                        onChange={(e: any)=>setState({...state, row: e.currentTarget.value})}
                        //helperText="Some important text"
                        />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        id="outlined-helperText"
                        label="Seat"
                        placeholder="Enter Seat"
                        value={state.seats}
                        onChange={(e: any)=>setState({...state, seats: e.currentTarget.value})}
                        //helperText="Some important text"
                        />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        id="outlined-helperText"
                        label="Category"
                        placeholder="Enter Category"
                        value={state.cat}
                        onChange={(e: any)=>setState({...state, cat: e.currentTarget.value})}
                        //helperText="Some important text"
                        />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        id="outlined-helperText"
                        label="Type"
                        placeholder="Enter Type"
                        value={state.type}
                        onChange={(e: any)=>setState({...state, type: e.currentTarget.value})}
                        //helperText="Some important text"
                        />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        id="outlined-helperText"
                        label="Currency"
                        placeholder="Enter currency"
                        value={state.currency}
                        onChange={(e: any)=>setState({...state, currency: e.currentTarget.value})}
                        //helperText="Some important text"
                        />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        id="outlined-helperText"
                        label="Original Price"
                        placeholder="Enter Original Price"
                        value={state.price}
                        onChange={(e: any)=>setState({...state, price: e.currentTarget.value})}
                        //helperText="Some important text"
                        />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        id="outlined-helperText"
                        label="Barcode/QRCOde"
                        placeholder="Enter Barcode/QRCOde"
                        value={state.bid}
                        onChange={(e: any)=>setState({...state, bid: e.currentTarget.value})}
                        //helperText="Some important text"
                        />
                </Grid>
            </Grid>
                
        </Box>
      </Container>
    </React.Fragment>
  );
}