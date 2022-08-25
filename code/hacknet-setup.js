/** @param {import("..").NS} ns */
export async function main(ns) {
	const nodes = 10;
	while (ns.hacknet.numNodes() < nodes) {
		ns.print("Buying new node");
		if (ns.hacknet.purchaseNode() == -1) break;
	}
	while (true) {
		var minNodeLevel = 99999;
		var minNodeId = -1;
		//ns.print("Node count: ", ns.hacknet.numNodes());
		for (let i = 0; i < ns.hacknet.numNodes(); i++) {
			var level = ns.hacknet.getNodeStats(i).level;
			//ns.print("Checking node ", i, " for level ", level, "<", minNodeLevel);
			if (level < minNodeLevel) {
				minNodeId = i; 
				minNodeLevel = level;
			}
		}
		if (minNodeId == -1)
		{
			ns.print("didn't find any nodes!"); return;
		}
	//	var currentLevel = ns.hacknet.getNodeStats(minNode).level;
		var targetIncrease = (10 - (minNodeLevel % 10));
		var upgradeCost = ns.hacknet.getLevelUpgradeCost(minNodeId, targetIncrease);
		ns.print("Upgrading node ", minNodeId, " by ", targetIncrease, " for $", upgradeCost);
		if (ns.getServerMoneyAvailable("home") > upgradeCost) {
			ns.hacknet.upgradeLevel(minNodeId, targetIncrease);
		}
		else {
			ns.print("oops, out of money");
			return;
		}
	}

}