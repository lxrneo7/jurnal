import React from 'react';

const BookingsList = ({ bookings }) => {
  const sortedBookings = bookings.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bookings-list">
      <h2>Текущие бронирования</h2>
      {sortedBookings.length === 0 ? (
        <p>Нет бронирований.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Фамилия и Имя</th>
              <th>Зал</th>
              <th>Дата</th>
              <th>Время от</th>
              <th>Время до</th>
              <th>Добавочная</th>
            </tr>
          </thead>
          <tbody>
            {sortedBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.fullName}</td> {/* Use fullName here */}
                <td>{booking.room.charAt(0).toUpperCase() + booking.room.slice(1)}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.startTime}</td>
                <td>{booking.endTime}</td>
                <td>{booking.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingsList;
