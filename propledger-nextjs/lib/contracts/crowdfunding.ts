import { ethers } from "ethers";
import abi from "../../abis/Crowdfunding.json";
import { CONTRACT_ADDRESSES } from "./addresses";

export const getCrowdfundingContract = (signer: ethers.Signer) => {
  return new ethers.Contract(
    CONTRACT_ADDRESSES.Crowdfunding,
    abi.abi,
    signer
  );
};

export const getCrowdfundingReadContract = (provider: ethers.Provider) => {
  return new ethers.Contract(
    CONTRACT_ADDRESSES.Crowdfunding,
    abi.abi,
    provider
  );
};