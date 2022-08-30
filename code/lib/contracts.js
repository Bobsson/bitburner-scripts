/**
 * 
 * @param {import("../..").NS} ns 
 * @param {function} callback 
 */
export async function runContract(ns, callback, testOnly)
{
    var host = ns.args[0];
    var contract = "contract-" + ns.args[1] + ".cct";
    var description = ns.codingcontract.getDescription(contract, host);
    let type = ns.codingcontract.getContractType(contract, host);
    let data = ns.codingcontract.getData(contract, host);
    let result = callback(data);
    ns.tprint(contract, " result: ", result);
    if (testOnly === true)
    {
        ns.print("\n\n--------\n\n");
        ns.print(type);
        ns.print(description);
        ns.print("Result: ", result);
    }
    else if (await ns.prompt(description + "\n\n\n" + result + "\n\n\n" + "Submit?"))
    {
        ns.tprint("Result: ", ns.codingcontract.attempt(result, contract, host, {"returnReward": true}));
    }
}