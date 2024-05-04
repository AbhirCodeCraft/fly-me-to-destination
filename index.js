/* Explanation at the bottom */

const findLeastJumpsWithRoute = (airportGraph) => {
    const queue = [{ airport: 1, jumps: 0, path: [1] }]; // To keep track of routes to be traveled
    const visited = new Set(); // To keep track of unique visited airports
    while (queue.length > 0) {
        const { airport, jumps, path } = queue.shift();

        if (airport === Object.keys(airportGraph).length) { // Shortest path is found, return result
            return { jumps, path };
        }

        visited.add(airport); // Register current airport as visited

        for (const destination of airportGraph[airport]) { // Create all possible paths with current airport
            if (!visited.has(destination)) {
                const newPath = [...path, destination];
                queue.push({ airport: destination, jumps: jumps + 1, path: newPath });
            }
        }
    }
    return { jumps: -1, path: [] }; // No path found to reach destination
}

const getMap = (airports) => {
    let map = {}; // To register all possible direct destinations from the airports

    for (const [i, val] of airports.entries()) {
        let directDestinations = []; // To store all possible direct destinations from the current airport
        if (i !== airports.length - 1) { // No need to calculate for destination
            for (let index = i + 2; index < i + 2 + val; index++) {
                if (index <= airports.length) directDestinations.push(index); // No need to look beyond destination
            }
        }
        map[i + 1] = directDestinations;
    }

    return map
};

const airports = [1, 6, 3, 4, 5, 0, 0, 0, 6];
const { jumps, path } = findLeastJumpsWithRoute(getMap(airports));
console.log("Least number of planes required:", jumps);
if (path.length) {
    console.log("Complete route (Represented by airport serial number):", path.join(" -> "));
}

/* 
Approach - This solution uses Breadth-first search (BFS), which explores vertices layer by layer starting from the initial vertex. 

It first explores all vertices at distance 1 from the starting vertex, then all vertices at distance 2, and so on. 

This ensures that shorter paths are explored before longer paths.

Once the algorithm finds the first path which leads to the destination, it will be the shortest path available in terms of jumps required.
*/