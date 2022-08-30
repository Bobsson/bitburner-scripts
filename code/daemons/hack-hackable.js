import * as libPort from "/lib/ports";

/** 
 * @param {import("../..").NS} ns 
 * @description Primary server-hacking module.  Will periodically attempt to hack anything that needs root access.
 * @requires ./support/smart-hack.js
 * */
export async function main(ns) {
    while (true) {
        let targetString = await libPort.sendQuery(ns, 2, ns.args[0]);
        //ns.print("Target List: ", targetString);
        if (targetString != "") {
            let targets = targetString.toString().split(",");
            for (var target of targets) {
                ns.print("Hacking ", target);
                ns.run("support/smart-hack.js", 1, target);
                await ns.sleep(2000);
            }
        }
        if (ns.args[0] == "ALL") return;
        await ns.sleep(1000 * 60); // Only worth checking once a minute.
    }

}