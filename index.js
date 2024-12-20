const { Provider } = require('@reef-chain/evm-provider');
const { WsProvider } = require('@polkadot/api');

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
    const address = "5EnY9eFwEDcEJ62dJWrTXhTucJ4pzGym4WZ2xcDKiT3eJecP";

    try {
        const accountInfo = await provider.api.query.system.account(address);
        const freeBalance = accountInfo.data.free.toString();
        const reservedBalance = accountInfo.data.reserved.toString();

        console.log(`Free Balance: ${freeBalance}`);
        console.log(`Reserved Balance: ${reservedBalance}`);
    } catch (error) {
        console.error("Error fetching balance:", error);
    } finally {
        provider.api.disconnect();
    }
};

main();
