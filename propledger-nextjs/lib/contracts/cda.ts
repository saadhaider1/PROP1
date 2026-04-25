import { ethers } from "ethers";
import abi from "../../abis/CDAAuthority.json";
import { CONTRACT_ADDRESSES } from "./addresses";

export const getCDAContract = (signerOrProvider: ethers.Signer | ethers.Provider) => {
  return new ethers.Contract(
    CONTRACT_ADDRESSES.CDAAuthority,
    abi.abi,
    signerOrProvider
  );
};
