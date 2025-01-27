// size of the board
const SIZE = 8;

// returns the number assigned in the graph for that coordinate
// coordinate is a [a, b], a, b being a number
function hash(coordinate) {
    const [a, b] = coordinate;
    return SIZE * a + b;
}

// coordinates are of the form [horizontal, vertical]
const coordinates = (function createCoordinateTable() {
    let coordinateTable = [];
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            const index = hash([i, j]);
            coordinateTable[index] = [i, j];
        }
    }
    return coordinateTable;
})();

// create an adjacency list for the graph
const graph = (function createGraph() {
    let graph = [];
    coordinates.forEach((coordinate, index) => {
        graph[index] = getPossibleMoves(coordinate);
    });

    function getAdjacentVertices(vertex) {
        return graph[vertex];
    }

    return {
        graph,
        getAdjacentVertices,
    };
})();

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

// use BFS
// but maintain a path of nodes to the destination instead of just node in the queue
function findPath(source, destination, graph) {
    let queue = [[source]];

    // Necessary Because we can fall into a loop in Graph if we don't
    let visited = new Set();
    while (queue.length !== 0) {
        const path = queue.shift();
        const vertex = path.at(-1);

        if (vertex === destination) return path;

        if (!visited.has(vertex)) {
            const adjacentVertices = graph.getAdjacentVertices(vertex);

            // create new path for each neighbor and push that to the queue
            for (let adjacent of adjacentVertices) {
                let newPath = [].concat(path);
                newPath.push(adjacent);
                queue.push(newPath);
            }

            visited.add(vertex);
        }
    }
}

function knightMoves(source, destination) {
    source = hash(source);
    destination = hash(destination);
    const path = findPath(source, destination, graph);
    console.log(`Congrats! You made it in ${path.length - 1} moves!`);
    for (const coordinate of path) {
        console.log(`(${coordinates[coordinate]})`);
    }
}

console.log("For (3,3) to (4, 3)");
knightMoves([3, 3], [4, 3]);
console.log("For (0,0) to (3, 3)");
knightMoves([0, 0], [3, 3]);
