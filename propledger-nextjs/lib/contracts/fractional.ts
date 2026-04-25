import { ethers } from "ethers";
import abi from "../../abis/FractionalInvestment.json";
import { CONTRACT_ADDRESSES } from "./addresses";


export const getFractionalContract = (
signerOrProvider: ethers.Signer | ethers.Provider
 ) => {
  return new ethers.Contract(
    CONTRACT_ADDRESSES.FractionalInvestment,
    abi.abi,
    signerOrProvider
  );
}
 