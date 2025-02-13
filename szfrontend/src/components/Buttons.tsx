import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Stack } from "@mui/material";
import type { Dayjs } from "dayjs";
import type React from "react";
import { CSVLink } from "react-csv";
import type { Header, TableData } from "../App.tsx";

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
			<Stack
				direction="row"
				paddingBottom={3}
				spacing={2}
				//sx={{ paddingBottom: "20px" }}
			>
				<Button
					size="small"
					variant="contained"
					endIcon={<FileDownloadIcon />}
					component="span"
					sx={{ height: "100%" }} //cheap fix, but it works
					onClick={exportToXLSX}
					disabled={!isFiltered}
				>
					.xlsx
				</Button>
				{/*I have to conditionally render the link, since CSVLink cannot be disabled
				and can't be put inside the button either. If I find a better solution, I'll change this.*/}
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
							sx={{ height: "100%" }} //cheap fix, but it works
						>
							.csv
						</Button>
					</CSVLink>
				) : (
					<Button
						size="small"
						variant="contained"
						endIcon={<FileDownloadIcon />}
						sx={{ height: "100%" }} //cheap fix, but it works
						disabled
					>
						.csv
					</Button>
				)}
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
