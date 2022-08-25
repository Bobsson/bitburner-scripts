/** 
 * @param {import("../..").NS} ns 
 * @returns {Array<string>} servers
*/
export function getAllServers(ns)
{
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

            var newTargets = ns.scan(s);
            toVisit = toVisit.concat(newTargets);
        }
    }
    //ns.print(Object.keys(servers));
    return Object.keys(servers);
}