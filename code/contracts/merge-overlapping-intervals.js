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
            //data = [[1, 3], [8, 10], [2, 6], [10, 16], [17, 20]];
            ns.print(data);
            data.sort((a,b) => a[0] - b[0]);
            values.push(data[0]);
            let abort = 3;
            while (abort-- > 0)
            {
                let changed = false;
                for (let n of data) // next
                {
                    var e = values.pop(); // existing
                    if (n[1] <= e[1])
                    {
                        values.push(e);
                    }
                    else if (e[1] < n[0])
                    {
                        values.push(e);
                        values.push(n);
                        changed = true;
                    }
                    else if (e[0] <= n[0] && e[1]+1 >= n[0]) // Overlap that starts later
                    {
                        values.push([e[0], n[1]]);
                        changed = true;
                    }
                    else if (n[0] <= e[1] && n[1]+1 >= e[1]) // Overlap that starts earlier
                    {
                        values.push([e[0], n[1]]);
                        changed = true;
                    }
                    else if (n[0] <= e[0]) // We're in a new loop and this isn't needed.
                    {
                        values.push(e);
                    }
                    else // No overlap
                    {
                        values.push(e);
                        values.push(n);
                    }
                    ns.print(values, " ", changed);                    
                }
                if (!changed) break;
                ns.print("Going to next loop because ", changed);
            }
            ns.print("Final: ", values);
            return values;
        });
}
