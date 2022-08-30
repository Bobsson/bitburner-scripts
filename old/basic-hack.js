/** @param {import("..").NS} ns */
export async function main(ns, server) {
	while(true) {
		if (ns.getServerSecurityLevel(server) > ns.getServerMinSecurityLevel(server) + .05)
		{
			ns.weaken(server);
		}
		await ns.grow(server);
		await ns.hack(server);
		await ns.hack(server);
	}
}