const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PropertyToken", function () {
  it("Should mint tokens to initial holder", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("PropertyToken");
    const token = await Token.deploy("PropToken", "PT", 1000, owner.address);

    await token.waitForDeployment();

    expect(await token.balanceOf(owner.address)).to.equal(1000n);
  });
});