import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { type ChangeEvent, useState } from "react";
import type React from "react";
import type { TableData } from "../App.tsx";

interface DataTableProps {
	data: TableData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	dayjs.extend(localizedFormat);

	return (
		<>
			{/*I'd virtualize this table, but for 150 rows it does not matter*/}
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
						{data
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((item) => (
								<TableRow key={item.id}>
									<TableCell>{item.id}</TableCell>
									<TableCell>{item.label}</TableCell>
									<TableCell>{dayjs(item.datum).format("LLL")}</TableCell>
									<TableCell>{item.name}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 20, 50, 150]}
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</>
	);
};

export default DataTable;
