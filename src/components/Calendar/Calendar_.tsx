import React from "react";
import Calendar from "react-calendar";
import "./Calendar_.css";

interface CalendarProps {
  onDateChange: (date: Date) => void;
  todaysDate: Date;
}

const Calendar_: React.FC<CalendarProps> = ({ onDateChange, todaysDate }) => {
  const onCalendarChange = (newDate: Date) => {
    onDateChange(newDate);
  };

  return (
    <>
      <Calendar onChange={onCalendarChange} value={todaysDate} />
    </>
  );
};

export default Calendar_;
