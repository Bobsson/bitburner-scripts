/** @param {NS} ns */
export async function main(ns) {
    var target = ns.args[0];
    var moneyThresh = ns.args[1];
    var securThresh = ns.args[2];
    while (true) {
        var moneyValue = ns.getServerMoneyAvailable(target);
        var securValue = ns.getServerSecurityLevel(target);
        if (securValue > securThresh) {
            ns.print("Too secure, running weaken (" + securValue + " > " + securThresh + ")");
            await ns.weaken(target);
        } else if (moneyValue < moneyThresh) {
            ns.print("Too poor, running grow (" + moneyValue + " < " + moneyThresh + ")");
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}