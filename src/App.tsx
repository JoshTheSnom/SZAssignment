
import './App.css'
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5178/data'

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
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Label</th>
                    <th>Datum</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {table.map(( item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.label}</td>
                        <td>{item.datum}</td>
                        <td>{item.name}</td>
                    </tr>
                    ))}
            </tbody>

        </table>
    </>
  )
}

export default App
