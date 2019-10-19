import React from "react";
import Game from './components/Game';
import Table from './components/Table';
import './styles/main.css';

const App = () => {
    return (
        <section style={styles.appContainer}>
            <div style={styles.container}>
                <Game/>
            </div>
            <div style={Object.assign({}, styles.container, {alignItems: 'left'})}>
                <Table/>
            </div>
        </section>
    )
};

const styles = {
    appContainer: {
        display: 'flex',
        borderColor: '#eeeeee',
        borderWidth: 2,
        borderStyle: 'solid',
        alignItems: 'stretch',
        height: '100vh'
    },
    container: {
        borderRightColor: '#eeeeee',
        borderRightStyle: 'solid',
        borderRightWidth: 2,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 'auto',
        alignSelf: 'flex-start',
        height: '100vh'
    }
};

export default App;