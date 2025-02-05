const { Provider } = require('@reef-chain/evm-provider');
const { WsProvider } = require('@polkadot/api');
const {Contract} = require("ethers");
const motoDexReef = require("./contracts/motoDexReef.json");
const motoDexNftReef = require("./contracts/motoDexNftReef.json");

const wsUrl = "wss://rpc.reefscan.com/ws";

const initProvider = async () => {
    const provider = new Provider({
        provider: new WsProvider(wsUrl),
    });

    await provider.api.isReady;
    return provider;
};

const main = async () => {
    const provider = await initProvider();
    const motoDexReefContract = new Contract(motoDexReef.address,motoDexReef.abi,provider);
    const motoDexNftReefContract = new Contract(motoDexNftReef.address,motoDexNftReef.abi,provider);

    try {
        const tokenIdsAndOwners = await motoDexReefContract.tokenIdsAndOwners();
        console.log("tokenIdsAndOwners===",tokenIdsAndOwners[0]);

        const getAllGameBids = await motoDexReefContract.getAllGameBids();
        console.log("getAllGameBids===",getAllGameBids[0]);

        const getGameSessions = await motoDexReefContract.getGameSessions();
        console.log("getGameSessions===",getGameSessions[0]);

        const valueInMainCoin = await motoDexReefContract.valueInMainCoin(0)
        console.log("valueInMainCoin===",valueInMainCoin);

    } catch (error) {
        console.error("Error fetching balance:", error);
    } finally {
        provider.api.disconnect();
    }
};

main();
