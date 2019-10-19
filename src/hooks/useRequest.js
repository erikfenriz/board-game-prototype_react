import {useState} from 'react';
import api from "../api/api";

export default () => {
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const getApi = async (url) => {
        try {
            const response = await api.get(url);
            setErrorMessage(false);
            setResults(response);
        } catch (err) {
            setErrorMessage("Server request failed");
        }
    };

    const postApi = async (winner, date) => {
        try {
            await api.post('/winners', {
                winner,
                date,
            });
        } catch (err) {
            setErrorMessage("Server request failed");
        }
    };

    return [getApi, postApi, results, errorMessage];
}