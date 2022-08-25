import * as libPort from "lib/ports.js";

/** @param {import("../..").NS} ns */
export async function main(ns) {
    await libPort.runServer(ns, 2, (data) => {return data;});
}