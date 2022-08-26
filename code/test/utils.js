import * as utils from "lib/utils.js";

/** @param {import("../..").NS} ns */
export async function main(ns) {
    var mode = ns.args[0];
    if (mode == 1)
    {
        ns.print(utils.getAllServers(ns));
    }
    else if (mode == 2)
    {
        ns.print(utils.getAllHostnames(ns));
    }
    else if (mode == 3)
    {
        ns.print(utils.getAllServersWithPaths(ns))
    }
}
