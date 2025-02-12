import "./App.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "dayjs/locale/cs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import DataTable from "./components/DataTable.tsx";
import DateFilters from "./components/DateFilters.tsx";

const API_URL = "http://localhost:5178/data";
const darkTheme = createTheme({ palette: { mode: "dark" } });

export interface TableData {
	id: number;
	label: string | null;
	datum: string; //is supposed to be date
	name: string | null;
}

function App() {
	dayjs.locale("cs");

	const [table, setTable] = useState<TableData[]>([]);
	const [filteredTable, setFilteredTable] = useState<TableData[]>([]);
	const [fromDate, setFromDate] = useState<Dayjs | undefined>(undefined);
	const [toDate, setToDate] = useState<Dayjs | undefined>(undefined);
	const [fromError, setFromError] = useState<string | null>(null);
	const [toError, setToError] = useState<string | null>(null);
	const [isFiltered, setIsFiltered] = useState<boolean | null>(false);

	const handleSearch = () => {
		const filtered = table.filter((item) => {
			const itemDate = dayjs(item.datum);

			console.log("test");

			return (
				(itemDate.isAfter(fromDate) ||
					itemDate.isSame(fromDate) ||
					!fromDate) &&
				(itemDate.isBefore(toDate) || itemDate.isSame(toDate) || !toDate)
			);
		});
		setIsFiltered(true); //after first search, the table is considered filtered
		setFilteredTable(filtered);
	};

	useEffect(() => {
		fetch(API_URL)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				const typedData = data as TableData[];
				const sortedData = typedData.sort((a, b) => a.id - b.id); //for now sorting by id
				setTable(sortedData);
				setFilteredTable(sortedData);
			});
	}, []);

	const exportToXLSX = () => {
		const worksheet = XLSX.utils.json_to_sheet(filteredTable);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
		XLSX.writeFile(workbook, "exported_data.xlsx");
	};

	const headers = [
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
								<CSVLink
									data={filteredTable}
									headers={headers}
									filename={"exported_data.csv"}
								>
									<Button
										size="small"
										variant="contained"
										endIcon={<FileDownloadIcon />}
										component="span"
										sx={{ height: "100%" }} //cheap fix, but it works
										disabled={!isFiltered}
									>
										.csv
									</Button>
								</CSVLink>
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
						</Stack>
						<DataTable data={filteredTable} />
					</Stack>
				</ThemeProvider>
			</LocalizationProvider>
		</>
	);
}

export default App;
