import './App.css'
import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider, styled} from '@mui/material/styles';

const API_URL = 'http://localhost:5178/data'
const darkTheme = createTheme({palette: {mode: 'dark'}});

export interface TableData {
    id: number
    label: string | null
    datum: string //is supposed to be date
    name: string | null
}


function App() {
    const [table, setTable] = useState<TableData[]>([]);
    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setTable(data);
            });
    }, []);


    return (
        <>
            <div>
                <p>Lorem ipsum</p>
            </div>
            <div>
                {/*<pre>{JSON.stringify(table, null, 2)}</pre>*/}
            </div>
            <ThemeProvider theme={darkTheme}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Label</TableCell>
                                <TableCell>Datum</TableCell>
                                <TableCell>Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.label}</TableCell>
                                    <TableCell>{item.datum}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ThemeProvider>

        </>
    )
}

export default App
