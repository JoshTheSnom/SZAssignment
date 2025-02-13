import "./App.css";
import { Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "dayjs/locale/cs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Buttons from "./components/Buttons.tsx";
import DataTable from "./components/DataTable.tsx";
import DateFilters from "./components/DateFilters.tsx";

//API endpoint for fetching data
const API_URL = "http://localhost:5178/data";

//Define dark theme using MUI's theme provider
const darkTheme = createTheme({ palette: { mode: "dark" } });

export interface TableData {
	id: number;
	label: string | null;
	datum: string; //Represents date as a string
	name: string | null;
}

export interface Header {
	label: string;
	key: string;
}

function App() {
	dayjs.locale("cs"); //Set dayjs locale to Czech throughout the whole app

	//States for handling table data and filters
	const [table, setTable] = useState<TableData[]>([]);
	const [filteredTable, setFilteredTable] = useState<TableData[]>([]);
	const [fromDate, setFromDate] = useState<Dayjs | undefined>(undefined);
	const [toDate, setToDate] = useState<Dayjs | undefined>(undefined);
	const [fromError, setFromError] = useState<string | null>(null);
	const [toError, setToError] = useState<string | null>(null);
	const [isFiltered, setIsFiltered] = useState<boolean>(false);

	//Fetch data on and sort it by ID
	useEffect(() => {
		fetch(API_URL)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				const typedData = data as TableData[];
				const sortedData = typedData.sort((a, b) => a.id - b.id);
				setTable(sortedData);
				setFilteredTable(sortedData);
			});
	}, []);

	//Filter data based on selected date range
	const handleSearch = () => {
		const filtered = table.filter((item) => {
			const itemDate = dayjs(item.datum);

			//Check if item date falls within range
			return (
				(itemDate.isAfter(fromDate) ||
					itemDate.isSame(fromDate) ||
					!fromDate)
				&&
				(itemDate.isBefore(toDate) ||
					itemDate.isSame(toDate) ||
					!toDate)
			);
		});
		setIsFiltered(true); //Mark that filtering has occurred
		setFilteredTable(filtered);
	};

	//Export filtered data to XLSX file
	const exportToXLSX = () => {
		const worksheet = XLSX.utils.json_to_sheet(filteredTable);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
		XLSX.writeFile(workbook, "exported_data.xlsx");
	};

	//Table headers definition
	const headers: Header[] = [
		{ label: "ID", key: "id" },
		{ label: "Label", key: "label" },
		{ label: "Datum", key: "datum" },
		{ label: "Name", key: "name" },
	];

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
				<ThemeProvider theme={darkTheme}>
					<Stack spacing={1}>
						<Stack direction="row" spacing={30}>
							{/*Pass props to DateFilters component*/}
							<DateFilters
								{...{
									fromDate,
									toDate,
									setFromDate,
									setToDate,
									fromError,
									toError,
									setFromError,
									setToError,
								}}
							/>

							{/*Pass props to Buttons component for filtering and exporting*/}
							<Buttons
								{...{
									filteredTable,
									headers,
									isFiltered,
									fromError,
									toError,
									fromDate,
									toDate,
									exportToXLSX,
									handleSearch,
								}}
							/>
						</Stack>
						{/*Display filtered data in the DataTable*/}
						<DataTable data={filteredTable} />
					</Stack>
				</ThemeProvider>
			</LocalizationProvider>
		</>
	);
}

export default App;
