import { Stack } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import type { Dayjs } from "dayjs";
import type React from "react";

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
			<DateTimePicker
				label="Datum od"
				onChange={(newValue) => setFromDate(newValue || undefined)}
				onError={() =>
					setFromError("Datum od nemůže být později než Datum do!")
				}
				maxDateTime={toDate}
				slotProps={{
					textField: {
						helperText: fromError,
					},
				}}
				sx={{ minWidth: 260 }}
			/>

			<DateTimePicker
				label="Datum do"
				onChange={(newValue) => setToDate(newValue || undefined)}
				onError={() => setToError("Datum do nemůže být dříve než Datum od!")}
				minDateTime={fromDate}
				slotProps={{
					textField: {
						helperText: toError,
					},
				}}
				sx={{ minWidth: 260 }}
			/>
		</Stack>
	);
};

export default DateFilters;
