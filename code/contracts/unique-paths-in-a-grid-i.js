/* Unique Paths in a Grid I
You are attempting to solve a Coding Contract. You have 9 tries remaining, after which the contract will self-destruct.

You are in a grid with 8 rows and 3 columns, and you are positioned in the top-left corner of that grid. You are trying to reach the bottom-right corner of the grid, but you can only move down or right on each step. Determine how many unique paths there are from start to finish.

NOTE: The data returned for this contract is an array with the number of rows and columns:

[8, 3]


*/

/** @param {import("../..").NS} ns */
export async function main(ns) 
{
    let data = ns.codingcontract.getData(ns.args[1], ns.args[0]);
    let height = data[0];
    let width = data[1];
    let paths = ["R", "D"];
    let goals = [];

    ns.print("Grid of ", width, " across by ", height, " down");
    while (true)
    {
        if (paths.length == 0) break;
        let path = paths.pop();
        if (path.length == width+height-1) { goals.push(path); continue; }
        //ns.print("Examining ", path, " which has ", countLetter(path, /D/gi), " Ds and ", countLetter(path, /R/gi), " Rs");
        let down = countLetter(path, /D/gi);
        let across = countLetter(path, /R/gi);
        
        if (down >= height-1) 
        {
            // Only one valid option once we've gone down enough.
            paths.push(path + "R");
        }
        else if (across >= width-1)
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
    ns.tprint("Count: ", goals.length);
    if (await ns.prompt("Submit?"))
    {
        ns.tprint("Result: ", ns.codingcontract.attempt(goals.length, ns.args[1], ns.args[0], {"returnReward": true}));
    }
}

/** @returns {Number} */
function countLetter(str, match) {
    var count = str.match(match);
    return count ? count.length : 0;
  }