/* Unique Paths in a Grid II
You are attempting to solve a Coding Contract. You have 9 tries remaining, after which the contract will self-destruct.


You are located in the top-left corner of the following grid:

0,0,0,0,
0,0,0,0,
0,0,0,0,

You are trying reach the bottom-right corner of the grid, but you can only move down or right on each step. Furthermore, there are obstacles on the grid that you cannot move onto. These obstacles are denoted by '1', while empty spaces are denoted by 0.

Determine how many unique paths there are from start to finish.

NOTE: The data returned for this contract is an 2D array of numbers representing the grid.
*/

/** @param {import("../..").NS} ns */
export async function main(ns) 
{
    let data = ns.codingcontract.getData(ns.args[1], ns.args[0]);
    let grid = Array.from(data);
    let height = grid.length;
    let width = parseInt(grid[0].length);
    let paths = ["R", "D"];
    let goals = [];

    ns.print("Grid of ", width, " across by ", height, " down");
    while (true)
    {
        if (paths.length == 0) break;
        let path = paths.pop();
        if (path.length == width+height-1) { goals.push(path); continue; }
        //ns.print("Examining ", path, " which has ", countLetter(path, /D/gi), " Ds and ", countLetter(path, /R/gi), " Rs");
        if (countLetter(path, /D/gi) >= height-1) 
        {
            // Only one valid option once we've gone down enough.
            paths.push(path + "R");
        }
        else if (countLetter(path, /R/gi) >= width-1)
        {
            // Only one valid option once we've gone right enough.
            paths.push(path + "D");
        }
        else
        {
            paths.push(path + "R");
            paths.push(path + "D");
        }
    }

    ns.print(goals);
    ns.print(goals.length);
    ns.tprint("Count, assuming no blockers: ", goals.length);
}

function countLetter(str, match) {
    var count = str.match(match);
    return count ? count.length : 0;
  }