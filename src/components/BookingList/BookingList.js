import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

function BookingList() {
  const [bookingList, setBookingList] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)

  useEffect(()=>{
    const email = loggedInUser.email;
    fetch(`http://localhost:5000/booking?email=${email}`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => setBookingList(data));
  },[loggedInUser.email])

  return (
    <div>
      <ul>
        {
          bookingList && bookingList.map( (list) => `Name: ${list.name} Email: ${list.email} Checkin: ${new Date(list.checkIn).toDateString('dd/MM/YY')} checkout: ${new Date(list.checcheckOutkIn).toDateString('dd/MM/YY')}` )
        }
      </ul>
    </div>
  );
}

export default BookingList;