/** @param {import("../..").NS} ns */
export async function main(ns) 
{
    let data = ns.codingcontract.getData(ns.args[1], ns.args[0]);
    let type = ns.codingcontract.getContractType(ns.args[1], ns.args[0]);
    let desc = ns.codingcontract.getDescription(ns.args[1], ns.args[0]);

    ns.print("Type: ", type);
    ns.print("Data: ", data);
    ns.print("Description: ", desc);
}