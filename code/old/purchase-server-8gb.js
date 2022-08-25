/** @param {import("../..").NS} ns */
export async function main(ns) {
    // How much RAM each purchased server will have. In this case, it'll
    // be 8GB.
    var ram = 8;

    // Iterator we'll use for our loop
    var i = ns.getPurchasedServers().length;

    // Continuously try to purchase servers until we've reached the maximum
    // amount of servers
    while (i < ns.getPurchasedServerLimit()) {
        var hostname = "pserv-" + i;
        // Check if we have enough money to purchase a server
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
            // If we have enough money, then:
            //  1. Purchase the server
            //  2. Copy our hacking script onto the newly-purchased server
            //  3. Run our hacking script on the newly-purchased server with 3 threads
            //  4. Increment our iterator to indicate that we've bought a new server
            var host = ns.purchaseServer(hostname, ram);
        }
        else if (!ns.serverExists(hostname))
        {
            return;
        }
        
        ns.scp(["servers/server-hack-weaken.js", "servers/server-hack-grow.js", "servers/server-hack-hack.js"], hostname);
        ++i;
    }
}