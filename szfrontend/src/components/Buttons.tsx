import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Stack } from "@mui/material";
import type { Dayjs } from "dayjs";
import type React from "react";
import { CSVLink } from "react-csv";
import type { Header, TableData } from "../App.tsx";

//Definition for expected props
interface ButtonsProps {
	filteredTable: TableData[];
	headers: Header[];
	isFiltered: boolean;
	fromError: string | null;
	toError: string | null;
	fromDate: Dayjs | undefined;
	toDate: Dayjs | undefined;
	exportToXLSX: () => void;
	handleSearch: () => void;
}
const Buttons: React.FC<ButtonsProps> = ({
	filteredTable,
	headers,
	isFiltered,
	fromError,
	toError,
	fromDate,
	toDate,
	exportToXLSX,
	handleSearch,
}) => {
	return (
		<>
			{/*Stack component for arranging buttons horizontally*/}
			<Stack
				direction="row"
				paddingBottom={3}
				spacing={2}
			>
				{/*Button for exporting to .xlsx, disabled if no filters are applied*/}
				<Button
					size="small"
					variant="contained"
					endIcon={<FileDownloadIcon />}
					component="span"
					sx={{ height: "100%" }} //Cheap fix for height alignment
					onClick={exportToXLSX}
					disabled={!isFiltered}
				>
					.xlsx
				</Button>

				{/*Conditionally render CSV download button, as CSVLink can't be disabled*/}
				{isFiltered ? (
					<CSVLink
						data={filteredTable}
						headers={headers}
						separator={";"}
						filename={"exported_data.csv"}
					>
						<Button
							size="small"
							variant="contained"
							endIcon={<FileDownloadIcon />}
							sx={{ height: "100%" }} //Cheap fix for height alignment
						>
							.csv
						</Button>
					</CSVLink>
				) : (
					//Disabled CSV button if no filters are applied
					<Button
						size="small"
						variant="contained"
						endIcon={<FileDownloadIcon />}
						sx={{ height: "100%" }} //Cheap fix for height alignment
						disabled
					>
						.csv
					</Button>
				)}
				{/*Search button, disabled if there's an error in the date range or no dates set*/}
				<Button
					size="small"
					variant="outlined"
					endIcon={<SearchIcon />}
					onClick={handleSearch}
					disabled={!!fromError || !!toError || (!toDate && !fromDate)}
				>
					Search
				</Button>
			</Stack>
		</>
	);
};

export default Buttons;
