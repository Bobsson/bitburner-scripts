/** @param {import("..").NS} ns */
export async function main(ns) {
	var target = ns.args[0];
	var threads = 4;

	var moneyThresh = ns.getServerMaxMoney(target) * .25;
	var securThresh = ns.getServerMinSecurityLevel(target) + 5;
	var moneyValue = ns.getServerMoneyAvailable(target);
	var securValue = ns.getServerSecurityLevel(target);

	for (var server of ns.getPurchasedServers()) {
        ns.killall(server);
        await ns.sleep(5000);
        if (securValue > securThresh) {
            ns.print("Too secure, running weaken (" + securValue + " > " + securThresh + ")");
            ns.exec("/deployable/server-hack-weaken.js", server, threads, target, securThresh);
        } else if (moneyValue < moneyThresh) {
            ns.print("Too poor, running grow (" + moneyValue + " < " + moneyThresh + ")");
            ns.exec("/deployable/server-hack-grow.js", server, threads, target, moneyThresh);
        } else {
            ns.exec("/deployable/server-hack-hack.js", server, threads, target);
        }
	}
}