import React, { Fragment, useState } from 'react';
import DatePicker from 'react-datepicker';

const CompleteDatePicker = (props) => {
  const { pickedDate } = props;
  const [startDate, setStartDate] = useState(new Date());

  let selectedDate = pickedDate !== undefined ? new Date(pickedDate) : startDate;

  return (
    <Fragment>
      <DatePicker
        id="date"
        className="form-control form-control-rounded px-4 mb-3"
        wrapperClassName="u-datepicker"
        selected={selectedDate}
        onSelect={(date) => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
        isClearable
        placeholderText={startDate}
      />
    </Fragment>
  );
};

export default CompleteDatePicker;
