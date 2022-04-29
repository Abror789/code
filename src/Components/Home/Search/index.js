import React, {useEffect, useState} from 'react';
import { Input } from 'antd';
import {Table} from "react-bootstrap";
import {NavLink} from "react-router-dom";
const { Search } = Input;


const SearchMain = () => {
    const people = [
        "Olma",
        "Nok",
        "Behi",
        "Banan",
        "Ananas",
        "Olcha",
        "Anor"
    ];
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    useEffect(()=>{
        const results = people.filter(e =>
            e.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    },[searchTerm])
    return (
        <div className="search-page container">
            <h1>Search page</h1>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            />
            {searchResults.length>=1 && <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {searchResults.map((item,i)=>{
                    return(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{item}</td>
                        </tr>
                    )
                })}

                </tbody>
            </Table>}
            {searchResults.length===0 && <h6>No data</h6>}
            <NavLink to="/">Go to Company Page</NavLink>
        </div>
    );
};

export default SearchMain;
