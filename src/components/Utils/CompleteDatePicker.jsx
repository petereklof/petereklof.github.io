import React, { Fragment, useState } from 'react';
import DatePicker from 'react-datepicker';

const CompleteDatePicker = (props) => {
  const { pickedDate } = props;
  const [startDate, setStartDate] = useState(new Date());
  const selectedDate = pickedDate !== undefined ? new Date(pickedDate) : startDate;
  const displayDate = startDate.toString() === new Date().toString() ? selectedDate : startDate;

  return (
    <Fragment>
      <DatePicker
        id="date"
        className="form-control form-control-rounded px-4 mb-3"
        wrapperClassName="u-datepicker"
        selected={displayDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
      />
    </Fragment>
  );
};

export default CompleteDatePicker;
