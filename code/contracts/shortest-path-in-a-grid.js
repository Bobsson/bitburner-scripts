/* You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are located in the top-left corner of the following grid:

  [[0,0,1,0,0,0,0],
   [0,0,0,0,0,1,0],
   [0,0,0,1,1,0,0],
   [0,0,0,0,0,0,0],
   [1,0,0,0,1,1,0],
   [0,0,1,1,1,1,0],
   [0,1,0,1,1,0,0],
   [0,0,1,1,0,1,0],
   [0,0,0,0,0,0,1],
   [0,1,0,0,0,0,0],
   [0,0,1,0,0,0,0],
   [0,0,0,0,0,0,0]]

You are trying to find the shortest path to the bottom-right corner of the grid, but there are obstacles on the grid that you cannot move onto. These obstacles are denoted by '1', 
while empty spaces are denoted by 0.

Determine the shortest path from start to finish, if one exists. The answer should be given as a string of UDLR characters, indicating the moves along the path

NOTE: If there are multiple equally short paths, any of them is accepted as answer. If there is no path, the answer should be an empty string.
NOTE: The data returned for this contract is an 2D array of numbers representing the grid.

Examples:

    [[0,1,0,0,0],
     [0,0,0,1,0]]

Answer: 'DRRURRD'

    [[0,1],
     [1,0]]

Answer: ''
*/


/** @param {import("../..").NS} ns */
export async function main(ns) 
{
    let data = ns.codingcontract.getData(ns.args[1], ns.args[0]);
    //ns.print(data);

    // Step 1, replace the 1's with a non-number.
    for (let row in data)
    {
        //ns.print("Row is ", row);
        for (let col in data[row])
        {
            //ns.print("Col is ", col);
            if (data[row][col] == "1") {
                //ns.print("Changing (", col, ",", row, ") to *");
                data[row][col] = "*";}
            else 
            {
                data[row][col] = 99;
            }
        }
    }
    data[0][0] = 0;
    //ns.print(data);

    // Step 2, floodfill.
    let abort = 100;
    while (true)
    {
        for (let row in data)
        {
            //ns.print("Row: ", data[row]);
            for (let col in data[row])
            {
                //ns.print("Next: (", col, ",", row,") => ", data[row][col]);
                if (data[row][col] == "*" || data[row][col] == 99) continue;
                flood(ns, data, col, row, data[row][col]);
                ns.print(data);
            }
        }
        if (data[data.length-1][data[0].length-1] != "99") break;
        if (abort-- == 0) break;
    }
    ns.print(data);

    // Step 3, find best path, working backwards.

    let cury = data.length-1;
    let curx = data[cury].length-1;
    let c = {"x": curx, "y": cury};
    //let length = data[cury][data[0].length-1];
    //let step = data[cury][curx];
    let path = [];
    //abort = 10;
    while (true)
    {
        c = takeNextStep(ns, data, path, c);
        if (c.x == 0 && c.y == 0) break;
        if (abort-- == 0) break;
        
    ns.print(Array.from(path).reverse());
    }
    ns.print(path);
    path.reverse();
    ns.print(path.join(""));
    ns.tprint("Result: ", path.join(""));
    if (await ns.prompt("Submit?"))
        ns.tprint(ns.codingcontract.attempt(path.join(""), ns.args[1], ns.args[0], {"returnReward": true}));
}

/**
 * 
 * @param {NS} ns 
 * @param {Array<Array<Number>>} grid 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} distance 
 */
function flood(ns, grid, x, y, distance)
{
    // No idea why I need to do this, but otherwise + becomes concatination.
    x = parseInt(x);
    y = parseInt(y);
    distance = parseInt(distance);
    if (distance == 99) return;

    if (x > 0 && grid[y][x-1] != "*" && grid[y][x-1] > distance+1) grid[y][x-1] = distance+1;
    if (y > 0 && grid[y-1][x] != "*" && grid[y-1][x] > distance+1) grid[y-1][x] = distance+1;
    if (y < grid.length-1 && grid[y+1][x] != "*" && grid[y+1][x] > distance+1) grid[y+1][x] = distance+1;
    if (x < grid[y].length-1 && grid[y][x+1] != "*" && grid[y][x+1] > distance+1) grid[y][x+1] = distance+1;
}

/**
 * 
 * @param {Ns} ns 
 * @param {Array<Array<Number>>} grid 
 * @param {Array<String>} path 
 * @param {Number} curx
 * @param {number} cury
 */
function takeNextStep(ns, grid, path, c)
{
    let current = grid[c.y][c.x];
    ns.print("In:  (", c.x, ",", c.y,") => ", current);
    // Valeus are backwards, because we're going from the end.
    if (c.y > 0 && grid[c.y-1][c.x] == current-1) {path.push("D"); c.y--; }
    if (c.y < grid.length-1 && grid[c.y+1][c.x] == current-1) {path.push("U"); c.y++; }
    if (c.x > 0 && grid[c.y][c.x-1] == current-1) {path.push("R"); c.x--; }
    if (c.x < grid[0].length-1 && grid[c.y][c.x+1] == current-1) {path.push("L"); c.x++; }
    //ns.print("Out: (", c.x, ",", c.y,") => ", grid[c.y][c.x]);
    return c;
}