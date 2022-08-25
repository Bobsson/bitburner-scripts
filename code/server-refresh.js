import * as libPort from "lib/ports.js";

/** @param {import("..").NS} ns */
export async function main(ns) {
	var refreshMins = ns.args[1];

	while(true)
	{
		var target = await libPort.sendQuery(ns, 1, "hack");
		ns.run("server-hack.js", 1, target);
		await ns.sleep(1000*60*refreshMins);
	}

}