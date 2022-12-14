/** 
 * @param {import("../../..").NS} ns 
 * @description Break into a server and have it start attacking itself.
 * @requires ./hack-it.js
 * @requires ./break-in.js
 * */
export async function main(ns) {
    var scriptSize = ns.getScriptRam("/daemons/support/hack-it.js");
    ns.print("Beginning hack...");

    for (var target of ns.args) {
        ns.print("Target is " + target);
        var moneyThresh = ns.getServerMaxMoney(target) * .75;
        var securThresh = ns.getServerMinSecurityLevel(target) + 5;
        var targetRam = ns.getServerMaxRam(target);
        await ns.scp("/daemons/support/hack-it.js", target);
        ns.run("/daemons/support/break-in.js", 1, target);
        while (ns.scriptRunning("/daemons/support/break-in.js", "home")) { await ns.sleep(2000); }
        if (targetRam != 0) {
            var instances = targetRam / scriptSize;
            ns.print("Running with ", instances, " threads and $ = ", moneyThresh, " & security = ", securThresh);
            ns.exec("/daemons/support/hack-it.js", target, instances, target, moneyThresh, securThresh);
            ns.print("Started scripts on " + target + "(" + instances + " threads)");
        }
        else
        {
            ns.print("No RAM on target ", target);
        }
    }
}