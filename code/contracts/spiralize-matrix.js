/* Given the following array of arrays of numbers representing a 2D matrix, return the elements of the matrix as an array in spiral order:

    [
        [37,49,24,42,37,39]
    ]

Here is an example of what spiral order should be:

    [
        [1, 2, 3]
        [4, 5, 6]
        [7, 8, 9]
    ]

Answer: [1, 2, 3, 6, 9, 8 ,7, 4, 5]

Note that the matrix will not always be square:

    [
        [1,  2,  3,  4]
        [5,  6,  7,  8]
        [9, 10, 11, 12]
    ]

Answer: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
*/

import * as libcon from "/lib/contracts"
/** @param {import("../..").NS} ns */
export async function main(ns) {
    await libcon.runContract(ns, d => {
        /** @type {Array<Array<Number>>}  */
        let data = d;
        ns.print(d);
        let curUp = 0;
        let curDown = data.length -1;
        let curLeft = 0;
        let curRight = data[0].length-1;
        let nextMove = "R";
        let x = 0;
        let y = 0;

        let results = [];
        while (true) {
            results.push(data[y][x]);
            ns.print(results);
            if (nextMove == "R") {
                if (x + 1 > curRight) {
                    curUp++;
                    nextMove = "D"; // Can't move any more right
                }
                else x++;
            }
            // Not an "else", so that we turn the corner as part of the same pass
            if (nextMove == "D") {
                if (y + 1 > curDown) {
                    curRight--;
                    nextMove = "L";
                }
                else y++;
            }

            if (nextMove == "L") {
                if (x - 1 < curLeft) {
                    curDown--;
                    nextMove = "U";
                }
                else x--;
            }

            if (nextMove == "U") {
                if (y - 1 < curUp) {
                    curLeft++;
                    nextMove = "R";
                    x++; // Have to do this here instead of looping back to the "R" case.
                }
                else y--;
            }
            ns.print(`Next step to the ${nextMove} => ${curLeft} < ${x} < ${curRight} && ${curUp} < ${y} <${curDown}`);
            if (curUp == curDown && curLeft == curRight) return results;
            if (curUp > curDown || curLeft > curRight) return results;
        }
    });
}