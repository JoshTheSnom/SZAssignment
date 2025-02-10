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
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import type {Dayjs} from "dayjs";
import dayjs from "dayjs";
import {type ChangeEvent, useEffect, useState} from "react";

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
	const [fromDate, setFromDate] = useState<Dayjs | null>(null);
	const [toDate, setToDate] = useState<Dayjs | null>(null);

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

			return (
				(itemDate.isAfter(fromDate) ||
					itemDate.isSame(fromDate) ||
					!fromDate) &&
				(itemDate.isBefore(toDate) || itemDate.isSame(toDate) || !toDate)
			);
		});
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

	return (
		<>
			<ThemeProvider theme={darkTheme}>
				<Stack spacing={1}>
					<Stack direction="row" spacing={30}>
						<Stack direction="row" spacing={2}>
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
								adapterLocale="cs"
							>
								<DemoContainer components={["DateTimePicker"]}>
									<DateTimePicker
										label="Datum od"
										onChange={(newValue) => setFromDate(newValue)}
									/>
								</DemoContainer>
								<DemoContainer components={["DateTimePicker"]}>
									<DateTimePicker
										label="Datum do"
										onChange={(newValue) => setToDate(newValue)}
									/>
								</DemoContainer>
							</LocalizationProvider>
						</Stack>
						<Stack direction="row" paddingTop={1} spacing={2}>
							<Button
								size="small"
								variant="contained"
								endIcon={<FileDownloadIcon />}
							>
								.csv
							</Button>
							<Button
								size="small"
								variant="outlined"
								endIcon={<SearchIcon />}
								onClick={handleSearch}
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
