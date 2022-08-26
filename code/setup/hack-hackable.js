import * as libPort from "lib/ports";

/** @param {import("../..").NS} ns */
export async function main(ns) {
    while (true) {
        let targetString = await libPort.sendQuery(ns, 2, "");
        //ns.print("Target List: ", targetString);
        if (targetString != "") {
            let targets = targetString.toString().split(",");
            for (var target of targets) {
                ns.print("Hacking ", target);
                ns.run("smart-hack.js", 1, target);
                await ns.sleep(2000);
            }
        }
        await ns.sleep(1000 * 60); // Only worth checking once a minute.
    }

}