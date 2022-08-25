/** @param {import("../NetscriptDefinitions").NS} ns */
export async function main(ns) {
	var target = ns.args[0];
	if (ns.hasRootAccess(target)) 
	{
		ns.print("Already root");
		return;
	}
	else if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(target))
	{
		ns.print("Too secure, need " + ns.getServerRequiredHackingLevel());
		return;
	}
	else
	{
		ns.print("Hacking " + target);
	    if (ns.fileExists("BruteSSH.exe", "home")) {
    	    ns.brutessh(target);
    	}
		if (ns.fileExists("FTPCrack.exe", "home")) {
			ns.ftpcrack(target);
		}
		ns.nuke(target);		
	}

}