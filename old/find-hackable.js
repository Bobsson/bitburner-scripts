/** @param {import("..").NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");
	var toVisit = ["home"];
	var servers = {};
	while (toVisit.length > 0) {
		var s = toVisit.pop();
		if (s.startsWith("pserv-")) {
			//ns.print("Skipping owned server ", s);
			continue;
		}
		//ns.print("Testing ", s, ", ", toVisit.length, " to visit");
		if (servers[s] == null) {
			//ns.print("Scanning ", s);
			servers[s] = ns.getServer(s);
			/*{
				'root': ns.hasRootAccess(s),
				'maxMoney': ns.getServerMaxMoney(s),
				'curMoney': ns.getServerMoneyAvailable(s),
				'perMoney': ns.getServerMoneyAvailable(s) / ns.getServerMaxMoney(s),
				'growTime': ns.getGrowTime(s),
				'growParm' : ns.getServerGrowth(s),

			};*/
			var newTargets = ns.scan(s);
			toVisit = toVisit.concat(newTargets);
		}
	};
	//ns.print(servers);
	var targets = Object.entries(servers)
						.filter(([name,data]) => !data.hasAdminRights && data.requiredHackingSkill <= ns.getHackingLevel())
						//.sort((a,b) => (b.moneyAvailable / b.moneyMax) - (a.moneyAvailable / a.moneyMax))
						//.sort((a,b) => { ns.print("Comparing", b[1].effectiveHackValuePerSecond, " - ", a[1].effectiveHackValuePerSecond);
						//return (b[1].effectiveHackValuePerSecond - a[1].effectiveHackValuePerSecond)})
						;
	//ns.print(targets);	
	// ns.print(targets.map(([key, value]) => {return {
	// 	"hostname": value.hostname,
	// 	"eHVS": value.effectiveHackValuePerSecond
	// };}))
	targets.forEach(([key, value]) => ns.print(value.hostname, ": ", 
											value.requiredHackingSkill, " skill, ", 
											value.numOpenPortsRequired, " ports, ", 
											value.maxRam, " ram"));
	//ns.print(targets.length);
	//ns.print(targets[0]);
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