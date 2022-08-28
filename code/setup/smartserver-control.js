import * as libport from "lib/ports";

/** @param {import("../..").NS} ns */
export async function main(ns) {
    ns.disableLog("sleep");
    ns.disableLog("exec");
    ns.disableLog("getServerMaxRam");
    while (true)
    {
        //ns.print("Starting loop");
        for (const host of ns.getPurchasedServers())
        {
            //let host = "pserv-" + i;
            //ns.print(host);
            let isBusy = ns.scriptRunning("/deployable/smartserver-grow.js", host)
                                || ns.scriptRunning("/deployable/smartserver-hack.js", host)
                                || ns.scriptRunning("/deployable/smartserver-weaken.js", host);
            //ns.print(host, " busy? ", isBusy);
            if (!isBusy)
            {
                var threads = ns.getServerMaxRam(host) / 1.75;
                let nextTarget = await libport.sendQuery(ns, 3);
                let split = nextTarget.split(" ");
                ns.print(host, ": ", nextTarget);
                if (split[0] == "Weaken")
                {
                    ns.exec("deployable/smartserver-weaken.js", host, threads, split[1]);
                }
                else if (split[0] == "Grow")
                {
                    ns.exec("deployable/smartserver-grow.js", host, threads, split[1]);
                }
                else
                {
                    ns.exec("deployable/smartserver-hack.js", host, threads, split[1]);
                }
            }
        }
        await ns.sleep(250);
    }
}