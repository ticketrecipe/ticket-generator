'use client';
/* eslint-disable */
import { useState, useEffect } from "react";
import styles from './form.module.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import NewForm from './newForm';



const formDataEmpty = {
    pname: "John Doe",
    eventName:"Lisa Fan Meetup in Asia 2024",
    eventID:"277e1cf6-9f84-497a-9383-ea3c0384a29a",
    type: "Reserved Seating",
    price: "500",
    cat: "Singular",
    sec: "C",
    row: "115",
    seats:"23",
    entrance:"West Gate",
    bid: '4444424571542301',
    currency:"SGD"
}

export default function NewSubmission(props: any) {
    const [formData, setFormData] = useState({
        ...formDataEmpty
    });
    const [events, setEvents] = useState([]);
    const [newData, setNewData] = useState({});

    // const handleChange = (e: any) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });        
    // };

    // const handleSubmit = (e: any) => {
    //     e.preventDefault();
    //     console.log("Form Data:", formData);
    //     props.onSubmitCallBack && props.onSubmitCallBack(newData);
    // };
    const resetForm = () => { 
        setFormData({...formDataEmpty})
    }

    useEffect(()=>{
        if(props.isreset){
            resetForm();
            props.resetData && props.resetData(false);
        }
    },[props.isreset]);

    useEffect(()=>{
        const getAllEvents = async () => {
            const response = await fetch("https://api.ticketrecipe.com/v1/events");
            const data = await response.json();
     
            setEvents(data);
        };
        getAllEvents()
    },[]);

    const handleUpdateFromForms = (data: any) => {
        setNewData(data);
    }

    const pasToPrintPage = () => {
        props.onSubmitCallBack && props.onSubmitCallBack(newData);
    }

  return (
    <>
    <Container fixed>
        <Box><h1 className={styles.title}>Ticket Generator</h1></Box>
    </Container>
    
    <NewForm onFormChange={handleUpdateFromForms} events={events}/>
    <Container fixed>
        <br/>
        <Button variant="outlined" startIcon={<AddIcon />} fullWidth>Add another ticket</Button>
        <br/><br/>
        <Button variant="contained" fullWidth onClick={pasToPrintPage}>Generate</Button>
    </Container>
     {/* <form className={styles.form} onSubmit={handleSubmit}>

            <label htmlFor="eventName" className={styles.label}>
                Event Name:
            </label>
            <input
                type="text"
                id="eventName"
                name="eventName"
                placeholder="Lisa Fan Meetup in Asia 2024"
                value={formData.eventName}
                onChange={handleChange}
                className={styles.input} />
            
            <label htmlFor="eventID" className={styles.label}>
                Event ID:
            </label>
            <input
                type="text"
                id="eventID"
                name="eventID"
                placeholder="277e1cf6-9f84-497a-9383-ea3c0384a29a"
                value={formData.eventID}
                onChange={handleChange}
                className={styles.input} />


            <label htmlFor="firstName" className={styles.label}>
                Patron Name:
            </label>
            <input
                type="text"
                id="pname"
                name="pname"
                placeholder="Jay"
                value={formData.pname}
                onChange={handleChange}
                className={styles.input} />



            <label htmlFor="lastName" className={styles.label}>
                Ticket Type:
            </label>
            <input
                type="text"
                id="type"
                name="type"
                placeholder="Reserved Seating"
                value={formData.type}
                onChange={handleChange}
                className={styles.input} />

            <label htmlFor="price" className={styles.label}>
                Original Price:
            </label>
            <input
                type="text"
                id="price"
                name="price"
                placeholder="500"
                value={formData.price}
                onChange={handleChange}
                className={styles.input} />

            <label htmlFor="currency" className={styles.label}>
                Currency:
            </label>
            <input
                type="text"
                id="currency"
                name="currency"
                placeholder="SGD"
                value={formData.currency}
                onChange={handleChange}
                className={styles.input} />   

            <label htmlFor="cat" className={styles.label}>
                Category:
            </label>
            <input
                type="text"
                id="cat"
                name="cat"
                placeholder="Singular"
                value={formData.cat}
                onChange={handleChange}
                className={styles.input} />

            <label htmlFor="cat" className={styles.label}>
                Section:
            </label>
            <input
                type="text"
                id="sec"
                name="sec"
                placeholder="C"
                value={formData.sec}
                onChange={handleChange}
                className={styles.input} />

            <label htmlFor="row" className={styles.label}>
                Row:
            </label>
            <input
                type="text"
                id="row"
                name="row"
                placeholder="115"
                value={formData.row}
                onChange={handleChange}
                className={styles.input} />

            <label htmlFor="seats" className={styles.label}>
                Seats:
            </label>
            <input
                type="text"
                id="seats"
                name="seats"
                placeholder="23"
                value={formData.seats}
                onChange={handleChange}
                className={styles.input} />

            <label htmlFor="ent" className={styles.label}>
                Entrance:
            </label>
            <input
                type="text"
                id="ent"
                name="entrance"
                placeholder="WEST GATES"
                value={formData.entrance}
                onChange={handleChange}
                className={styles.input} />

            <label htmlFor="cat" className={styles.label}>
                Booking ID:
            </label>
            <input
                type="text"
                id="bid"
                name="bid"
                placeholder="4444424571542301"
                value={formData.bid}
                onChange={handleChange}
                className={styles.input} />
     

            <button type="submit" className={styles.button}>
                Submit
            </button>
            <button type="reset" className={styles.button} onClick={resetForm}>
                Reset
            </button>
        </form> */}
    </>
  );
}