import { Stack } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import type { Dayjs } from "dayjs";
import type React from "react";

//Definition for expected props
interface DateFiltersProps {
	fromDate: Dayjs | undefined;
	toDate: Dayjs | undefined;
	setFromDate: (date: Dayjs | undefined) => void;
	setToDate: (date: Dayjs | undefined) => void;
	fromError: string | null;
	toError: string | null;
	setFromError: (date: string | null) => void;
	setToError: (date: string | null) => void;
}

const DateFilters: React.FC<DateFiltersProps> = ({
	fromDate,
	toDate,
	setFromDate,
	setToDate,
	fromError,
	toError,
	setFromError,
	setToError,
}) => {
	return (
		<Stack direction="row" spacing={2} paddingBottom={3}>
			{/*DateTimePicker for "from date"*/}
			<DateTimePicker
				label="Datum od"
				onChange={(newValue) => setFromDate(newValue || undefined)} //Update fromDate
				onError={() =>
					setFromError("Datum od nemůže být později než Datum do!") //Set error if fromDate is later than toDate
				}
				maxDateTime={toDate} //Prevent selecting a date later than toDate
				slotProps={{
					textField: {
						helperText: fromError, //Show error message if any
					},
				}}
				sx={{ minWidth: 260 }}
			/>
			{/*DateTimePicker for "to date"*/}
			<DateTimePicker
				label="Datum do"
				onChange={(newValue) => setToDate(newValue || undefined)} //Update toDate
				onError={() => setToError("Datum do nemůže být dříve než Datum od!")} //Set error if toDate is earlier than fromDate
				minDateTime={fromDate} //Prevent selecting a date earlier than fromDate
				slotProps={{
					textField: {
						helperText: toError, //Show error message if any
					},
				}}
				sx={{ minWidth: 260 }}
			/>
		</Stack>
	);
};

export default DateFilters;
