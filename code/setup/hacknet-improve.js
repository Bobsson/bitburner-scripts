/** @param {import("../..").NS} ns */
export async function main(ns) {
    var cutoff = ns.args[0];
    if (cutoff == undefined) 
    {
        ns.print("No threshold specified, using 0");
        cutoff = 0;
    }
    ns.disableLog("getServerMoneyAvailable");
    while (ns.getServerMoneyAvailable("home") > cutoff) {
        if (!findBestNodeUpgrade(ns)) break;
    }
}

/**
 * @param {import("../..").NS} ns 
 * @returns {string}
 */
function findBestNodeUpgrade(ns) {
    // Find lowest quality node
    var nodeCosts = {};
    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
        let coreCost = ns.hacknet.getCoreUpgradeCost(i, 1);
        let levelCost = ns.hacknet.getLevelUpgradeCost(i, 1);
        let ramCost = ns.hacknet.getRamUpgradeCost(i, 1);
        let totalCost = 1;
        if (coreCost != Infinity) totalCost *= coreCost;
        if (levelCost != Infinity) totalCost *= levelCost;
        if (ramCost != Infinity) totalCost *= ramCost;
        nodeCosts[i] = totalCost;
        // ns.print("Upgrade for ", i, "->", ns.hacknet.getCoreUpgradeCost(i, 1),
        //         " * ", ns.hacknet.getLevelUpgradeCost(i, 1),
        //         " * ", ns.hacknet.getRamUpgradeCost(i, 1));
    }
    //ns.print(nodeCosts);
    var sorted = Object.entries(nodeCosts).filter(n => n[1] != 1).sort((a, b) => a[1] - b[1]);
    //ns.print(sorted);
    if (sorted.length == 0) 
    {
        ns.tprint("Nothing to do"); return;
    }
    var cheapestId = sorted[0][0];
    var cheapestNode = ns.hacknet.getNodeStats(cheapestId);
    //ns.print("Targeting node ", cheapestId);

    // Find best upgrade
    var baseline = calculateMoneyGainRate(cheapestNode.level, cheapestNode.ram, cheapestNode.cores);
    var levelUp = calculateMoneyGainRate(cheapestNode.level + 10, cheapestNode.ram, cheapestNode.cores) - baseline;
    var ramUp = calculateMoneyGainRate(cheapestNode.level, cheapestNode.ram + 1, cheapestNode.cores) - baseline;
    var coreUp = calculateMoneyGainRate(cheapestNode.level, cheapestNode.ram, cheapestNode.cores + 1) - baseline;

    var levelValue = levelUp / ns.hacknet.getLevelUpgradeCost(cheapestId, 10);
    var ramValue = ramUp / ns.hacknet.getRamUpgradeCost(cheapestId, 1);
    var coreValue = coreUp / ns.hacknet.getCoreUpgradeCost(cheapestId, 1);

    //ns.print("Improvment values: ", levelValue, " | RAM: ", ramValue, " | Cores: ", coreValue);
    if (levelValue > ramValue && levelValue > coreValue) {
        ns.print("Upgrading ", cheapestId, " by 10 levels");
        return ns.hacknet.upgradeLevel(cheapestId, 10);
    }
    else if (ramValue > levelValue && ramValue > coreValue) {
        ns.print("Upgrading ", cheapestId, "'s ram");
        return ns.hacknet.upgradeRam(cheapestId, 1);
    }
    else if (coreValue > levelValue && coreValue > ramValue) {
        ns.print("Upgrading ", cheapestId, "'s cores");
        return ns.hacknet.upgradeCore(cheapestId, 1);
    }
    else {
        ns.alert("Ambiguous values");
    }
    return false;
}

function calculateMoneyGainRate(level, ram, cores) {
    const levelMult = level * 1.5;
    const ramMult = Math.pow(1.035, ram - 1);
    const coresMult = (cores + 5) / 6;
    return levelMult * ramMult * coresMult;
}
