/** @param {import("../../..").NS} ns */
export async function main(ns) {
	var target = ns.getServer(ns.args[0]);
	if (target.hasAdminRights) {
		ns.print("Already root");
		return;
	}
	else if (ns.getHackingLevel() < target.requiredHackingSkill) {
		ns.print("Too secure, need " + target.requiredHackingSkill);
		return;
	}
	else {
		ns.print("Hacking " + target.hostname);
		var ports = target.numOpenPortsRequired;
		if (ports-- > 0 && ns.fileExists("BruteSSH.exe", "home")) {
			ns.brutessh(target.hostname);
		}
		if (ports-- > 0 && ns.fileExists("FTPCrack.exe", "home")) {
			ns.ftpcrack(target.hostname);
		}
		if (ports-- > 0 && ns.fileExists("relaySMTP.exe", "home")) {
			ns.relaysmtp(target.hostname);
		}
		if (ports-- > 0 && ns.fileExists("HTTPWorm.exe", "home")) {
			ns.httpworm(target.hostname);
		}
		if (ports-- > 0  && ns.fileExists("SQLInject.exe", "home")) {
			ns.sqlinject(target.hostname);
		}
		if (ports > 0) {
			ns.alert("Too many ports!  Could not break in.");
		}
		else {
			ns.nuke(target.hostname);
		}
	}

}