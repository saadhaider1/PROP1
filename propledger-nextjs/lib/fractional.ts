import { ethers } from "ethers";
import abi from "../abis/FractionalInvestment.json";
import { CONTRACTS } from "./contracts";

export const getFractionalContract = async () => {
  const provider = new ethers.BrowserProvider((window as any).ethereum);;
  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACTS.FractionalInvestment,
    abi.abi,
    signer
  );
};