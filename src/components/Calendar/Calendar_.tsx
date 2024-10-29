import React, { useContext } from "react";
import Calendar from "react-calendar";
import "./Calendar_.css";
import { AppContext } from "../../context/Provider";

const Calendar_: React.FC = () => {
  const { selectedDate, handleDateChange } = useContext(AppContext);

  const onCalendarChange = (newDate: Date) => {
    handleDateChange(newDate);
  };

  return (
    <>
      <Calendar onChange={onCalendarChange} value={selectedDate} />
    </>
  );
};

export default Calendar_;
