import { ethers } from "ethers";
import abi from "../../abis/RealEstateRegistry.json";
import { CONTRACT_ADDRESSES } from "./addresses";


export const getRegistryContract = (signer: ethers.Signer) => {
  return new ethers.Contract(
    CONTRACT_ADDRESSES.RealEstateRegistry,
    abi.abi,
    signer
  );
};

export const getRegistryReadContract = (provider: ethers.Provider) => {
  return new ethers.Contract(
    CONTRACT_ADDRESSES.RealEstateRegistry,
    abi.abi,
    provider
  );
};