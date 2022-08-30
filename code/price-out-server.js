/** @param {import("..").NS} ns */
export async function main(ns) {
    for (let i = 1; i < ns.args[0]; i++)
    ns.tprint(Math.pow(2,i).toString().padStart(6), " GB: $", numberWithCommas(ns.getPurchasedServerCost(Math.pow(2,i))).padStart(14));
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}