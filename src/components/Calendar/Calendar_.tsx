import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar_.css";

interface CalendarProps {
  onDateChange: (date: Date) => void;
}

const Calendar_: React.FC<CalendarProps> = ({ onDateChange }) => {
  const [date, setDate] = useState<Date>(new Date());

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <>
      <Calendar onChange={handleDateChange} value={date} />
    </>
  );
};

export default Calendar_;

