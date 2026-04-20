import { ethers } from "ethers";
import abi from "../abis/RealEstateRegistry.json";
import { CONTRACTS } from "./contracts";

export const getRegistryContract = async () => {
 const provider = new ethers.BrowserProvider((window as any).ethereum);;
  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACTS.RealEstateRegistry,
    abi.abi,
    signer
  );
};