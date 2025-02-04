const { Provider } = require('@reef-chain/evm-provider');
const { WsProvider } = require('@polkadot/api');
const {Contract} = require("ethers");
const motoDexReef = require("./contracts/motoDexReef.json");

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
    const contract = new Contract(motoDexReef.address,motoDexReef.abi,provider);

    try {
        const tokenIdsAndOwners = await contract.tokenIdsAndOwners();
        console.log("tokenIdsAndOwners===",tokenIdsAndOwners[0]);

        const getAllGameBids = await contract.getAllGameBids();
        console.log("getAllGameBids===",getAllGameBids[0]);

        const getGameSessions = await contract.getGameSessions();
        console.log("getGameSessions===",getGameSessions[0]);

    } catch (error) {
        console.error("Error fetching balance:", error);
    } finally {
        provider.api.disconnect();
    }
};

main();
