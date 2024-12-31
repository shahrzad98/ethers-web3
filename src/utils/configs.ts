import config from "config/config.json";

const networks: { [x: string]: string } = config.networks;
const rpcUrls = config.rpcUrls;
const subgraph = config.subgraph;
const offchain = config.offchain;
const contractAddress = config.contractAddress;
const transactionEndpoint = config.transactionEndpoint;

export { networks, rpcUrls, subgraph, offchain, contractAddress, transactionEndpoint };
