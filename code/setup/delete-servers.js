/** @param {import("../..").NS} ns */
export async function main(ns) {
    var limit = ns.getPurchasedServerLimit();
    var i = 0; //ns.getPurchasedServers().length;
    if (limit == 0) {
        ns.print("No servers available");
        return;
    }
    // Continuously try to purchase servers until we've reached the maximum
    // amount of servers
    while (i < limit) {
        var hostname = "pserv-" + i++;
        ns.print("Processing server " + hostname);
        if (ns.serverExists(hostname)) {
            ns.killall(hostname);
            ns.deleteServer(hostname);
        }
    }
}
