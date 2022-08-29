import * as utils from "./lib/utils.js"

/** @param {import("..").NS} ns */
export async function main(ns) {
    let targets = utils.getAllServers(ns)
                            .filter(s => !s.backdoorInstalled && s.requiredHackingSkill <= ns.getHackingLevel())
                            .map(s => s.hostname);
    ns.tprint(targets);
}
