import * as libPort from "/lib/ports.js";

/** @param {import("../..").NS} ns */
export async function main(ns) {
    var port = ns.args[0];
    var data = ns.args[1];
    ns.print("Sending data: ", data);
    var response = await libPort.sendQuery(ns, port, data);
    ns.print("Response: ", response);    
}