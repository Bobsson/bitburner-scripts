/** @param {NS} ns */
export async function main(ns) {
    var target = ns.args[0];
    //var moneyThresh = ns.args[1];
    var securThresh = ns.args[1];
    while (true) {
        if (ns.getServerSecurityLevel(target) > securThresh)
        {
            await ns.weaken(target);
        }
        else return;
    }
}