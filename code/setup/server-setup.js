/** @param {import("../..").NS} ns */
export async function main(ns) {
    // How much RAM each purchased server will have. In this case, it'll
    // be 8GB.
    var ram = ns.args[0];
    if (ram == undefined) ram = 8;

    // Iterator we'll use for our loop
    var i = 0; //ns.getPurchasedServers().length;

    var limit = ns.getPurchasedServerLimit();
    if (limit == 0)
    {
        ns.tprint("No servers available");
        return;
    }
    // Continuously try to purchase servers until we've reached the maximum
    // amount of servers
    while (i < limit) {
        var hostname = "pserv-" + i;
        ns.print("Processing server " + hostname);
        if (!ns.serverExists(hostname)) {
            // Check if we have enough money to purchase a server
            if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
                // If we have enough money, then:
                //  1. Purchase the server
                //  2. Copy our hacking script onto the newly-purchased server
                //  3. Run our hacking script on the newly-purchased server with 3 threads
                //  4. Increment our iterator to indicate that we've bought a new server
                var host = ns.purchaseServer(hostname, ram);
                ns.tprint("Bought server ", host);
            }
            else {
                ns.print("Couldn't afford next server, need ", ns.getPurchasedServerCost(ram));
                ++i;
                continue;
            }
        }

        await ns.scp(["/deployable/server-hack-weaken.js", "/deployable/server-hack-grow.js", "/deployable/server-hack-hack.js", 
        "/deployable/smartserver-weaken.js", "/deployable/smartserver-grow.js", "/deployable/smartserver-hack.js"], hostname);
        ++i;
    }
}