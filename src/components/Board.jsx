import React, {PureComponent} from 'react';

const tileValues = {
    blankTile: '#ffffff',
    getReadyTile: '#42d8e8',
    playerTile: '#00e871',
    computerTile: '#e85a5f'
};

export default class Board extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tileColor: [],
            counter: 0,
            playerCounter: 0,
            computerCounter: 0,
            winner: ''
        };
        this.tiles = new Array(this.props.settings[this.props.gameSetup.difficulty].field).fill({});
        this.randomPointer = Array.from(new Array(this.tiles.length ** 2),
            (_, index) => index-- && ++index);
        this.colors = Array.from(new Array(this.tiles.length ** 2)).fill(tileValues.blankTile);
    }

    randomGenerator() {
        if (this.state.tileColor.length !== 0) {
            this.num = Math.floor(Math.random() * this.randomPointer.length);
            while (!(this.state.tileColor[this.num] === tileValues.blankTile)) {
                this.num = Math.floor(Math.random() * this.randomPointer.length);
            }
        } else {
            this.num = Math.floor(Math.random() * this.randomPointer.length);
        }
        return this.num;
    };

    tilesChange() {
        if (Math.round(this.props.settings[this.props.gameSetup.difficulty].field ** 2 / 2) === this.state.counter) {
            this.pickWinner();
        }

        if (this.state.winner === '') {
            if (this.colors[this.num] === tileValues.getReadyTile) {
                this.tileToRed()
            }
            if (this.colors.indexOf(tileValues.blankTile) !== -1) {
                this.colors[this.randomGenerator()] = tileValues.getReadyTile;
                this.setState((prevState) => ({tileColor: [...this.colors], counter: prevState.counter + 1}));
            } else {
                if (this.colors[this.num] !== tileValues.playerTile) {
                    this.tileToRed()
                }
                clearInterval(this.interval);
            }
        }
    };

    tileToRed() {
        this.colors[this.num] = tileValues.computerTile;
        this.setState((prevState) => ({
            tileColor: [...this.colors],
            computerCounter: prevState.computerCounter + 1
        }));
    }

    tileToGreen(e) {
        this.colors[e.target.dataset.key] = tileValues.playerTile;
        this.setState((prevState) => ({
            tileColor: [...this.colors],
            playerCounter: prevState.playerCounter + 1
        }));
    }

    pickWinner() {
        if (this.colors[this.num] !== tileValues.playerTile) {
            this.tileToRed()
        }
        if (this.state.playerCounter > this.state.computerCounter) {
            this.setState({winner: `The player ${this.props.gameSetup.name} wins`});
            this.props.pickWinner(this.props.gameSetup.name);
        } else if (this.state.playerCounter < this.state.computerCounter) {
            this.setState({winner: `Computer wins`});
            this.props.pickWinner('Computer');
        }
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
                this.tilesChange()
            },
            this.props.settings[this.props.gameSetup.difficulty].delay
        );
    }

    renderBoardGame() {
        let tileKey = -1;
        return this.tiles.map((student, value) => {
            return (
                <tr key={value}>
                    {this.tiles.map(() => {
                        tileKey++;
                        return <td
                            data-key={tileKey}
                            key={tileKey}
                            onClick={this.state.tileColor[tileKey] === tileValues.getReadyTile ?
                                (e) => {
                                    this.tileToGreen(e)
                                } : null}
                            style={{backgroundColor: this.state.tileColor[tileKey]}}
                        />
                    })}
                </tr>
            )
        })
    };

    render() {
        return (
            <main>
                <table>
                    <tbody>
                    {this.renderBoardGame()}
                    </tbody>
                </table>
            </main>
        )
    }
};