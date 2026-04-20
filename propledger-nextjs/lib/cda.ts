import { ethers } from "ethers";
import abi from "../abis/CDAAuthority.json";
import { CONTRACTS } from "./contracts";

export const getCDAContract = async () => {
 const provider = new ethers.BrowserProvider((window as any).ethereum);;
  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACTS.CDAAuthority,
    abi.abi,
    signer
  );
};