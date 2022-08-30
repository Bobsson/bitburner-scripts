/* Merge Overlapping Intervals
You are attempting to solve a Coding Contract. You have 15 tries remaining, after which the contract will self-destruct.


Given the following array of arrays of numbers representing a list of intervals, merge all overlapping intervals.

[[10,18],[6,13],[24,33],[13,23],[12,20],[17,19],[24,31],[10,18],[18,27],[22,27],[18,28],[21,24],[18,28],[17,18]]

Example:

[[1, 3], [8, 10], [2, 6], [10, 16]]

would merge into [[1, 6], [8, 16]].

The intervals must be returned in ASCENDING order. You can assume that in an interval, the first number will always be smaller than the second.
*/

import * as libcon from "/lib/contracts"
/** @param {import("../..").NS} ns */
export async function main(ns) 
{
    await libcon.runContract(ns, data => 
        {
            let values = [];
            //data = [[1, 3], [8, 10], [2, 6], [10, 16]];
            ns.print(data);
            for (let interval of data)
            {
                for (let i = interval[0]; i <= interval[1]; i++)
                {
                    values[i] = true;
                }
            }
            values.push(undefined);
            ns.print(values);
            let result = [];
            let start;
            for(let i = 0; i <= values.length; i++)
            {
                ns.print("Testing ", i, ": ", values[i-1], "=>", values[i-1] === undefined, "&", start === undefined);
                if (values[i-1] === undefined && start === undefined) continue; // Not in an interval
                else if (values[i-1] === undefined) // Ending an interval
                {
                    //ns.print("interval ", start, ",", i-2);
                    result.push([start, i-2]);
                    start = undefined;
                }
                else if (start === undefined) start = i-1; // Starting an interval
                else continue; // Still in an interval
            }
            ns.print(result);
            return result;
        });
}
