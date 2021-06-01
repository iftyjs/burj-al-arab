import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import BookingList from '../BookingList/BookingList';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser);
    const [selectedDate, setSelectedDate] = useState({
      checkIn: new Date(),
      checkOut: new Date()
    });
    const {bedType} = useParams();

    const checkInHandler = (date) => {
      console.log(date)
      setSelectedDate({...selectedDate, checkIn: date})
    }

    const checkOutHandler = (date) => {
      console.log(date)
      setSelectedDate({...selectedDate, checkOut: date})
    }

    const BookingDataHandler = () => {
      const booking = {...loggedInUser, ...selectedDate  }
      console.log("app", booking);
      fetch('http://localhost:5000/addBooking', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
      }).then(res => res.json())
      .then(data => console.log(data));
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                  <KeyboardDatePicker
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={selectedDate.checkIn}
                    onChange={checkInHandler}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                  />
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="dd/MM/yyyy"
                    value={selectedDate.checkOut}
                    onChange={checkOutHandler}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                  />
            </Grid>
            </MuiPickersUtilsProvider>

            <Button onClick={BookingDataHandler} variant="contained" color="primary">Book</Button>

            <br />
            <BookingList />
        </div>
    );
};

export default Book;