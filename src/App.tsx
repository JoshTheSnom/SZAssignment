import "./App.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import {
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/cs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import type {Dayjs} from "dayjs";
import dayjs from "dayjs";
import {type ChangeEvent, useEffect, useState} from "react";
import {CSVLink} from "react-csv";
import * as XLSX from "xlsx";

const API_URL = "http://localhost:5178/data";
const darkTheme = createTheme({ palette: { mode: "dark" } });

export interface TableData {
	id: number;
	label: string | null;
	datum: string; //is supposed to be date
	name: string | null;
}

function App() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [table, setTable] = useState<TableData[]>([]);
	const [filteredTable, setFilteredTable] = useState<TableData[]>([]);
	const [fromDate, setFromDate] = useState<Dayjs | undefined>(undefined);
	const [toDate, setToDate] = useState<Dayjs | undefined>(undefined);
	const [fromError, setFromError] = useState<string | null>(null);
	const [toError, setToError] = useState<string | null>(null);
	const [isFiltered, setIsFiltered] = useState<boolean | null>(false);

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

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
				console.log(data);
				setTable(data);
				setFilteredTable(data);
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
			<ThemeProvider theme={darkTheme}>
				<Stack spacing={1}>
					<Stack direction="row" spacing={30}>
						<Stack direction="row" spacing={2} paddingBottom={3}>
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
								adapterLocale="cs"
							>
								<DateTimePicker
									label="Datum od"
									onChange={(newValue) => setFromDate(newValue || undefined)}
									onError={() =>
										setFromError("Datum od nemůže být později, než Datum do!")
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
									onError={() =>
										setToError("Datum do nemůže být dříve, než Datum od!")
									}
									minDateTime={fromDate}
									slotProps={{
										textField: {
											helperText: toError,
										},
									}}
									sx={{ minWidth: 260 }}
								/>
							</LocalizationProvider>
						</Stack>

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

					<TableContainer component={Paper}>
						<Table size="small">
							<TableHead>
								<TableRow
									sx={{
										backgroundColor: "#111",
									}}
								>
									<TableCell>ID</TableCell>
									<TableCell>Label</TableCell>
									<TableCell>Datum</TableCell>
									<TableCell>Name</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredTable
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((item) => (
										<TableRow key={item.id}>
											<TableCell>{item.id}</TableCell>
											<TableCell>{item.label}</TableCell>
											<TableCell>{item.datum}</TableCell>
											<TableCell>{item.name}</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 20, 50, 150]}
						component="div"
						count={filteredTable.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Stack>
			</ThemeProvider>
		</>
	);
}

export default App;
