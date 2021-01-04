import React, { Fragment, useState } from 'react';
import DatePicker from 'react-datepicker';

const CompleteDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Fragment>
      <DatePicker
        id="date"
        className="form-control form-control-rounded px-4 mb-3"
        wrapperClassName="u-datepicker"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Date"
        dateFormat="yyyy-MM-dd"
      />
    </Fragment>
  );
};

export default CompleteDatePicker;
