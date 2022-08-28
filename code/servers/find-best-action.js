import * as libPort from "lib/ports";
import * as util from "/lib/utils";

/**
 *  @param {import("../..").NS} ns 
*/
export async function main(ns) {
	
    ns.disableLog("scan");
	ns.disableLog("getServerSecurityLevel");
	ns.disableLog("getServerMinSecurityLevel");
	await libPort.runServer(ns, 3, async (query) => {

		var servers = util.getAllServers(ns).filter(s => s.hasAdminRights && s.moneyMax > 0);
		for (const s of servers)
		{
			s.hackValue = s.moneyAvailable * ns.hackAnalyze(s.hostname);
			s.effectiveHackValue = s.hackValue * ns.hackAnalyzeChance(s.hostname);
			s.effectiveHackValuePerTime = s.effectiveHackValue / ns.getHackTime(s.hostname);

			if (s.moneyAvailable == 0) s.moneyAvailable = 1; // Prevent divide by zero for totally emptied servers
			s.moneyFillingCycles = ns.growthAnalyze(s.hostname, s.moneyMax / s.moneyAvailable);
			s.moneyFillingTime = s.moneyFillingCycles * ns.getGrowTime(s.hostname);

			s.weakeningNeeded = ns.getServerSecurityLevel(s.hostname) - ns.getServerMinSecurityLevel(s.hostname);
			s.weakeningCycles = s.weakeningNeeded / ns.weakenAnalyze(1);
			s.weakeningTime = s.weakeningCycles * ns.getWeakenTime(s.hostname);
		}


		// First, see if there's anything that needs weakening - fastest to longest.
		servers.sort((a,b) => a.weakeningTime - b.weakeningTime);
		if (servers[0].weakeningNeeded > 0)
		{
			// We have a target for weakening. Return it.
			ns.print("Weaken " + servers[0].hostname);
			return "Weaken " + servers[0].hostname;
		}

		// Ok, everything's as weak as possible. Now see what needs to be grown - fastest to longest
		servers.sort((a, b) => a.moneyFillingTime - b.moneyFillingTime);
		if (servers[0].moneyFillingTime > 0)
		{
			ns.print("Grow " + servers[0].hostname);
			return "Grow " + servers[0].hostname;
		}

		// Everything's topped up - hack the most valuable.
		servers.sort((a, b) => b.effectiveHackValuePerTime - a.effectiveHackValuePerTime);
		ns.print("Hack " + servers[0].hostname);
		return "Hack " + servers[0].hostname;

	});
}
