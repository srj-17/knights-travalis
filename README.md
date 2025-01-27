# Knights Travalis

A simple console program to trace the shortest path from the
current position of the knight to the destination position.

The chess board is structured as a 7 x 7 graph.
Graph is implemented using adjacency list.

## Algorithm used:

BFS algorithm is used to trace the path to the destination coordinate.
It is mostly the same as standard BFS, instead we store paths to the vertices
instead of vertices alone in the queue.

The algorithm goes as follows (roughly):

- Start by enqueueing `[start]`, which represents the starting path
- While the queue is not empty,
    - Dequeue the first path from the queue.
    - Find the last vertex in the path `current = path.at(-1)`
        - (this vertex represents the last vertex
          we visited in this path)
    - If this `current` vertex is our destination, return the `path`
    - If `current` is not visited yet,
        - For each vertex adjacent to the current vertex
            - Create a `new_path` ,where `new_path = path + adjacent_vertex`
            - Enqueue that `new_path` to the queue
            - Set `current` to `visited`
