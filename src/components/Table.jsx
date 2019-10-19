import React, {useState, useEffect} from 'react';
import useRequest from "../hooks/useRequest";

const Table = () => {
    const [getApi, _, results] = useRequest();
    const [table, setTable] = useState(null);
    const {containerStyles, resultStyle, textStyle} = styles;

    useEffect(() => {
        setInterval(() => getApi('/winners'), 1000)
    }, []);

    useEffect(() => {
        setTable(results.data);
    }, [results]);

    return (
        <div style={containerStyles}>
            <h1 style={{color: '#909090'}}>Leader Board</h1>
            {table ? table.slice(0).reverse().map((value) => {
                return (<div key={value.id} style={resultStyle}>
                    <p style={textStyle}>{value.winner}</p>
                    <p style={textStyle}>{value.date}</p>
                </div>);
            }) : table}
        </div>
    )
};

const styles = {
    containerStyles: {
        padding: '50px 50px 0 50px',
        whiteSpace: 'nowrap',
        overflowY: 'scroll'
    },
    resultStyle: {
        display: 'flex',
        backgroundColor: '#cfd8dc',
        justifyContent: 'space-between',
        width: 300,
        padding: '0 20px 0 20px',
        borderRadius: 3,
        marginTop: 3
    },
    textStyle: {
        color: '#80888a'
    }
};

export default Table;