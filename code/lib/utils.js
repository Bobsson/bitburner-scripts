/** 
 * @param {import("../..").NS} ns 
 * @returns {Array<string>}
*/
export function getAllHostnames(ns)
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

/** 
 * @param {import("../..").NS} ns 
 * @returns {Array<import("../..").Server>}
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
    return Object.values(servers);
}

/** 
 * @param {import("../..").NS} ns 
*/
export function getAllServersWithPaths(ns)
{
    var toVisit = ["home"];
    // Step 1: Get the list of all servers, and calculate their value.
    var servers = {"home":"home"};
    while (toVisit.length > 0) {
        var s = toVisit.pop();
        var newTargets = ns.scan(s);
        ns.print("From ", s, " can see ", newTargets);
        for (var target of newTargets)
        {
            if (target.startsWith("pserv-")) { continue; }
            if (servers[target] == null)
            {
                if (ns.getServer(target).backdoorInstalled)
                    servers[target] = servers[s] + ">" + target + "**";
                else
                    servers[target] = servers[s] + ">" + target;
                toVisit = toVisit.concat(target);
            }
        }
        ns.print("Visit list is now ", toVisit);
    }
    //ns.print(Object.keys(servers));
    return servers;
}