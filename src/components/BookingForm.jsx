import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';

const BookingForm = ({ addBooking, isTimeSlotAvailable }) => {
  const [room, setRoom] = useState('большой');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const rooms = ['большой', 'средний', 'малый'];
  const times = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00',
    '17:00'
  ];

  // Set date limits for the next week
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !phoneNumber) {
      setMessage('Пожалуйста, заполните обязательные поля.');
      return;
    }

    if (isTimeSlotAvailable(room, date, startTime, endTime)) {
      const newBooking = {
        id: uuidv4(),
        room,
        date: date.toISOString(),
        startTime,
        endTime,
        fullName,
        phone: phoneNumber,
      };
      addBooking(newBooking);
      setMessage('Бронь успешно создана!');
      setFullName('');
      setPhoneNumber('');
    } else {
      setMessage('Выбранное время уже занято.');
    }
  };

  return (
    <div className="booking-form">
      <h2>Забронировать зал</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Фамилия и Имя:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Введите фамилию и имя"
          />
        </div>
        <div>
          <label>Выберите зал:</label>
          <select value={room} onChange={(e) => setRoom(e.target.value)}>
            {rooms.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Выберите дату:</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            minDate={today} // Set the minimum date to today
            maxDate={maxDate} // Set the maximum date to one week from today
          />
        </div>
        <div>
          <label>Время начала:</label>
          <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
            {times.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Время окончания:</label>
          <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
            {times.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Добавочный номер:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Введите добавочную"
          />
        </div>
        <button type="submit">Забронировать</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default BookingForm;
