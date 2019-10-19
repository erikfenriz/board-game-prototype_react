import React, {useState} from 'react';

const Menu = ({settings, start, titles, play}) => {
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('default');
    const [error, setError] = useState(false);

    const inputHandler = (e) => setName(e.target.value);
    const selectHandler = (e) => setDifficulty(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        (name && difficulty) ?
            (setError(false) || start(name, difficulty)) : setError('Please, fill out the form');
    };

    const {containerStyles, dropDownStyles, inputStyles, buttonStyles, errorStyle} = styles;
    return (<section>
        <form style={containerStyles} onSubmit={(e) => handleSubmit(e)}>
            <select style={dropDownStyles}
                    onChange={selectHandler}
                    value={difficulty}
            >
                <option value="default" disabled>Pick game mode</option>
                {
                    titles.columns.map((option, key) => {
                        return settings ? settings[option.dataPath] &&
                            option.renderer(option.dataPath, option.label, key) : null
                    })
                }
            </select>
            <input style={inputStyles}
                   value={name}
                   onChange={inputHandler}
                   size="20"
                   type="text"
                   placeholder="Enter your name"
            />
            <input style={buttonStyles}
                   type="submit"
                   value={play}/>
            {error ? <p style={errorStyle}>{error}</p> : <p>&nbsp;</p>}
        </form>
    </section>)
};

const styles = {
    containerStyles: {
        padding: '50px 50px 0 50px',
        whiteSpace: 'nowrap',
    },
    dropDownStyles: {
        color: '#87989e',
        padding: '10px 30px 10px 15px',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        appearance: 'none',
        fontSize: 15,
        fontWeight: '300',
        border: 'none',
        background: `#cfd8dc url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='10' height='10' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='gray'/></g></svg>") right no-repeat`,
        backgroundPosition: 'right 10px top 55%'
    },
    inputStyles: {
        color: '#87989e',
        padding: '10px 0 10px 15px',
        backgroundColor: '#f3f3f3',
        border: 'none',
        fontSize: 15,
        fontWeight: '300',
        borderRadius: 2,
        margin: 10,
        width: 158
    },
    buttonStyles: {
        backgroundColor: '#7b8d93',
        color: 'white',
        borderRadius: 5,
        width: 140,
        lineHeight: 2.3,
        fontSize: 15,
        fontWeight: '300',
        textAlign: 'center',
        alignSelf: 'center',
        border: 'none'
    },
    errorStyle: {
        color: '#e85a5f'
    }
};

export default Menu;