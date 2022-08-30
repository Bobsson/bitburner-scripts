import * as libPort from "/lib/ports.js";
import * as util from "/lib/utils.js";

/** @param {import("../..").NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");
	await libPort.runServer(ns, 2, async (query) => {
		let portOpeners = 0;
		if (ns.fileExists("BruteSSH.exe")) portOpeners++;
		if (ns.fileExists("FTPCrack.exe")) portOpeners++;
		if (ns.fileExists("relaySMTP.exe")) portOpeners++;
		if (ns.fileExists("HTTPWorm.exe")) portOpeners++;
		if (ns.fileExists("SQLInject.exe")) portOpeners++;
		let servers = util.getAllHostnames(ns);
		let targets = servers
			.filter((s) => {
				let data = ns.getServer(s); 
				//ns.print(s, " -> ", data.numOpenPortsRequired, " vs ", portOpeners);
				return (!data.hasAdminRights || query === "ALL")
						&& data.requiredHackingSkill <= ns.getHackingLevel()
						&& data.numOpenPortsRequired <= portOpeners
			})
			;
		// targets.forEach(([key, value]) => ns.print(value.hostname, ": ",
		// 	value.requiredHackingSkill, " skill, ",
		// 	value.numOpenPortsRequired, " ports, ",
		// 	value.maxRam, " ram"));
		//ns.print(targets.length);
		//ns.print(targets[0]);
		ns.print(targets);
		return targets.toString();
	});
}
/*
;
	ns.print(targets);
					targets.sort(compareMoney);
	ns.print(targets);


function compareNumbers(a, b) {
  return a - b;
}
function compareMoney(a, b) {
	ns.print("Comparing ", a[1].maxMoney, " vs ", b[1].maxMoney);
  return a[1].maxMoney - b[1].maxMoney;
}
}*/