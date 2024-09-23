import React, { useState, useEffect } from 'react';
import BookingForm from './components/BookingForm';
import BookingsList from './components/BookingsList';
import './App.css';

function App() {
  const [bookings, setBookings] = useState([]);

  // Загружаем бронирования из Local Storage при инициализации
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);

  // Сохраняем бронирования в Local Storage при изменении
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking) => {
    setBookings([...bookings, booking]);
  };

  const isTimeSlotAvailable = (room, date, startTime, endTime) => {
    return !bookings.some(
      (b) =>
        b.room === room &&
        new Date(b.date).toDateString() === new Date(date).toDateString() &&
        (b.startTime < endTime && b.endTime > startTime)
    );
  };

  return (
    <div className="App">
      <h1>Система бронирования залов</h1>
      <div className="booking-form">
        <BookingForm addBooking={addBooking} isTimeSlotAvailable={isTimeSlotAvailable} />
      </div>
      <div className="bookings-list">
        <BookingsList bookings={bookings} />
      </div>
    </div>
  );
}

export default App;
