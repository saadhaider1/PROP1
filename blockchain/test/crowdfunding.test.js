const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Crowdfunding", function () {
  let crowdfunding, cda, owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // 1. Deploy CDA
    const CDA = await ethers.getContractFactory("CDAAuthority");
    cda = await CDA.deploy(owner.address);
    await cda.waitForDeployment();

    // 2. Deploy Crowdfunding
    const Crowd = await ethers.getContractFactory("Crowdfunding");
    crowdfunding = await Crowd.deploy();
    await crowdfunding.waitForDeployment();

    // 3. Wire CDA into Crowdfunding
    await crowdfunding.setCDAAuthority(await cda.getAddress());

    // 4. Approve property ID 1 (used in tests below)
    await cda.approveProperty(1);
  });

  it("Should create campaign", async function () {
    await crowdfunding.createCampaign(1, 100, 1000);

    const campaign = await crowdfunding.campaigns(0);
    expect(campaign.goal).to.equal(100n);
  });

  it("Should accept contributions", async function () {
    await crowdfunding.createCampaign(1, 100, 1000);

    await crowdfunding.connect(user).contribute(0, { value: 50 });

    const campaign = await crowdfunding.campaigns(0);
    expect(campaign.pledged).to.equal(50n);
  });

  it("Should track individual contributions", async function () {
    await crowdfunding.createCampaign(1, 100, 1000);

    await crowdfunding.connect(user).contribute(0, { value: 30 });

    const contributed = await crowdfunding.contributions(0, user.address);
    expect(contributed).to.equal(30n);
  });
});