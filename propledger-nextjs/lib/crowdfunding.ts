import { ethers } from "ethers";
import abi from "../abis/Crowdfunding.json";
import { CONTRACTS } from "./contracts";

export const getCrowdfundingContract = async () => {
const provider = new ethers.BrowserProvider((window as any).ethereum);;
  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACTS.crowdfunding,
    abi.abi,
    signer
  );
};