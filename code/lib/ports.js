// /** @param {import("../..").NS} ns */
// function openPort(ns)
// {
//     // Find an available "response" port and claim it.  
//     // Start at the end and work backwards.
//     var i = 20;
//     for (; i >= 1; i--)
//     {
//         var port = ns.getPortHandle(i);
//         if (port.empty()) {
//             port.write(ns.getScriptName());
//             return port;
//         }
//     }
//     return null;
// }


/** @param {import("../..").NS} ns */
export async function sendQuery(ns, portId, query)
{
	if (ns.isLogEnabled("sleep")) ns.disableLog("sleep");
    // Header: Script|Host|Port
    var header = [ns.getScriptName(), ns.getHostname(), portId].join("|");
    // Send the data with our header, then wait for a matching response.
    await ns.writePort(portId, header + "||" + query);
    while (!ns.peek(portId+10).startsWith(header))
    {
        await ns.sleep(1000);
    }
    return ns.readPort(portId+10).replace(header + "||", "");
}

/** @param {import("../..").NS} ns */
export async function runServer(ns, portId, callback)
{
	ns.disableLog("sleep");
    var port = ns.getPortHandle(portId);
    var responsePort = ns.getPortHandle(portId + 10);
    ns.print("Starting server on port ", portId);
    while(true)
    {
        // Wait for a message
        while(port.peek() == "NULL PORT DATA") await ns.sleep(10);
        var message = port.read();
        var header = message.substring(0, message.indexOf("||"));
        var query = message.replace(header + "||", "");
        ns.print("Found header: " + header);
        ns.print("  with query: " + query);

        // Pass the query to the callback
        var response = await callback(query);
        var responseMessage = header + "||" + response;
        ns.print("Sending response: " + responseMessage);
        while (!responsePort.tryWrite(responseMessage)) await ns.sleep(100);
    }
}