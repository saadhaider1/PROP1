const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CDAAuthority", function () {
  let cda, owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const CDA = await ethers.getContractFactory("CDAAuthority");
    cda = await CDA.deploy(owner.address);
    await cda.waitForDeployment();
  });

  it("Should approve property", async function () {
    await cda.approveProperty(1);
    expect(await cda.isApproved(1)).to.equal(true);
  });

  it("Should revoke approval", async function () {
    await cda.approveProperty(1);
    await cda.revokeApproval(1);
    expect(await cda.isApproved(1)).to.equal(false);
  });
});