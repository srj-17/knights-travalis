// size of the board
const SIZE = 8;

// returns the number assigned in the graph for that coordinate
// coordinate is a [a, b], a, b being a number
function hash(coordinate) {
    const [a, b] = coordinate;
    return SIZE * a + b;
}

// coordinates are of the form [horizontal, vertical]
function createCoordinateTable() {
    let coordinateTable = [];
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            const index = hash([i, j]);
            coordinateTable[index] = [i, j];
        }
    }
    return coordinateTable;
}

function getPossibleMoves(coordinate) {
    let possibleMoves = [];
    const [a, b] = coordinate;
    const moves = [
        [a + 2, b + 1],
        [a + 1, b + 2],
        [a - 1, b + 2],
        [a - 2, b + 1],
        [a - 2, b - 1],
        [a - 1, b - 2],
        [a + 1, b - 2],
        [a + 2, b - 1],
    ];
    for (const move of moves) {
        const [horizontalMove, verticalMove] = move;
        if (
            0 <= horizontalMove &&
            horizontalMove < SIZE &&
            0 <= verticalMove &&
            verticalMove < SIZE
        ) {
            possibleMoves = possibleMoves.concat(hash(move));
        }
    }

    return possibleMoves;
}

// create an adjacency list for the graph
function createGraph(coordinates) {
    let graph = [];
    coordinates.forEach((coordinate, index) => {
        graph[index] = getPossibleMoves(coordinate);
    });
    return graph;
}

const coordinates = createCoordinateTable();
const graph = createGraph(coordinates);
console.log(graph[0]);
