import {
    SparksToken__factory,
    SparksToken,
    IDOTokenBank__factory,
    IDOTokenBank,
    IDOPredictionPoolFactory__factory,
    IDOPredictionPoolFactory,
    TotemToken__factory,
    TotemToken,
    IDOPredictionPool__factory,
    IDOPredictionPool,
    WrappedERC20Token__factory,
    WrappedERC20Token,
} from "contracts/types";
import { useContract, useContractFromAddress } from "./contract";

export const useTotemTokenContract = (): TotemToken | undefined => {
    return useContract(TotemToken__factory.connect, "TotemToken");
};
export const useSparksTokenContract = (): SparksToken | undefined => {
    return useContract(SparksToken__factory.connect, "SparksToken");
};

export const useUsdContract = (): WrappedERC20Token | undefined => {
    return useContract(WrappedERC20Token__factory.connect, "USDCToken");
};

export const useIDOPredictionPoolContract = (poolAddress: string): IDOPredictionPool | undefined => {
    return useContractFromAddress(IDOPredictionPool__factory.connect, poolAddress);
};

export const useIDOTokenBankContract = (): IDOTokenBank | undefined => {
    return useContract(IDOTokenBank__factory.connect, "IDOTokenBank");
};

export const useIDOPredictionPoolFactoryContract = (): IDOPredictionPoolFactory | undefined => {
    return useContract(IDOPredictionPoolFactory__factory.connect, "IDOPredictionPoolFactory");
};
