import * as utils from "lib/utils.js";

/** @param {import("..").NS} ns */
export async function main(ns) {
    await utils.getAllHostnames(ns).forEach(async s => {
        ns.print("Checking server ", s);
        ns.ls(s).forEach(async file => {
            if (file.endsWith("cct"))
        {
            ns.tprint("Found contract on ", s);
        }
            else if (file.endsWith("js"))
            {}
            else if (!file.endsWith(".lit") && !file.endsWith(".txt"))
            {
                ns.print("Can't copy ", file);
            }
            else if (!ns.fileExists(file, "home")) {
                ns.print("Grabbing", file);
                await ns.scp(file, "home", s);
            }
            else {
                //ns.print("Already have ", file);
            }
        });
    });
}

