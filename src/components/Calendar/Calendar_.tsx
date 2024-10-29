import React, { useContext } from "react";
import Calendar from "react-calendar";
import "./Calendar_.css";
import { AppContext } from "../../context/Provider";

const Calendar_: React.FC = () => {
  const { c_selectedDate, c_handleDateChange } = useContext(AppContext);

  const onCalendarChange = (newDate: Date) => {
    c_handleDateChange(newDate);
  };

  return (
    <>
      <Calendar onChange={onCalendarChange} value={c_selectedDate} />
    </>
  );
};

export default Calendar_;
