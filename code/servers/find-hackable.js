import * as libPort from "lib/ports.js";
import * as util from "lib/utils.js";

/** @param {import("..").NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");
	await libPort.runServer(ns, 2, async (query) => {
		var servers = util.getAllHostnames(ns);
		var targets = servers
			.filter((s) => { var data = ns.getServer(s); return !data.hasAdminRights && data.requiredHackingSkill <= ns.getHackingLevel()})
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