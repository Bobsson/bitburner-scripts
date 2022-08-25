import * as libPort from "lib/ports.js";

/** @param {import("..").NS} ns */
export async function main(ns) {
	ns.disableLog("scan");
	await libPort.runServer(ns, 1, async (query) => {

		var toVisit = ["home"];
		// Step 1: Get the list of all servers, and calculate their value.
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
				servers[s]['hackValue'] = servers[s].moneyAvailable * ns.hackAnalyze(s);
				servers[s]['effectiveHackValue'] = servers[s].hackValue * ns.hackAnalyzeChance(s);
				servers[s]['effectiveHackValuePerSecond'] = servers[s].effectiveHackValue / ns.getHackTime(s);
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
		}

		// Step 2: Return the best hostname
		if (query == "hack") {
			var targets = Object.entries(servers)
				.filter(([name, data]) => data.hasAdminRights && data.moneyMax > 0)
				//.sort((a,b) => (b.moneyAvailable / b.moneyMax) - (a.moneyAvailable / a.moneyMax))
				.sort((a, b) => {
					//ns.print("Comparing", b[1].effectiveHackValuePerSecond, " - ", a[1].effectiveHackValuePerSecond);
					return (b[1].effectiveHackValuePerSecond - a[1].effectiveHackValuePerSecond)
				})
				;
			// Return the best (0) server's value (1, which is the server object)'s hostname
			ns.print("Best server for hacking: " + targets[0][1].hostname);
			return targets[0][1].hostname;
		}
		else
		{
			return "";
		}

	});
}
