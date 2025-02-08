
import './App.css'
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5178/data'


function App() {
    const [table, setTable] = useState([]);
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
            <pre>{JSON.stringify(table, null, 1)}</pre>
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
                <tr>
                {/* table content */}

                </tr>
            </tbody>

        </table>
    </>
  )
}

export default App
