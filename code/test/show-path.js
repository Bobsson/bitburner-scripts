import * as utils from "/lib/utils.js";

/** @param {import("..").NS} ns */
export async function main(ns) {
    let servers = utils.getAllServersWithPaths(ns);
    ns.tprint(servers[ns.args[0]]);
}
