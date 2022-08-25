/** @param {NS} ns */
export async function main(ns) {
	var target = ns.args[0];
	var refreshMins = ns.args[1];

	while(true)
	{
		ns.run("server-hack.js", 1, target);
		await ns.sleep(1000*60*refreshMins);
	}

}