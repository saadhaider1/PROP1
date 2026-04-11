const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deployment Test", function () {
  it("Should deploy CDAAuthority successfully", async function () {
    const [owner] = await ethers.getSigners();

    const CDA = await ethers.getContractFactory("CDAAuthority");
    const cda = await CDA.deploy(owner.address);

    await cda.waitForDeployment();

    expect(await cda.owner()).to.equal(owner.address);
  });
});