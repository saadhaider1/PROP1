const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FractionalInvestment", function () {
  let registry, cda, fractional, owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // 1. Deploy Registry
    const Registry = await ethers.getContractFactory("RealEstateRegistry");
    registry = await Registry.deploy();
    await registry.waitForDeployment();

    // 2. Deploy CDA
    const CDA = await ethers.getContractFactory("CDAAuthority");
    cda = await CDA.deploy(owner.address);
    await cda.waitForDeployment();

    // 3. Deploy FractionalInvestment
    const Fractional = await ethers.getContractFactory("FractionalInvestment");
    fractional = await Fractional.deploy(
      await registry.getAddress(),
      await cda.getAddress()
    );
    await fractional.waitForDeployment();

    // 4. Wire CDA and FractionalInvestment addresses into Registry
    await registry.setCDAAuthority(await cda.getAddress());
    await registry.setFractionalContract(await fractional.getAddress());

    // 5. Pre-approve property ID 0 BEFORE listing
    //    (listProperty checks isApproved(propertyCount) which is 0 at this point)
    await cda.approveProperty(0);

    // 6. List the property — price is the FIRST argument
    await registry.listProperty(
      1000,
      "Awan House",
      "house",
      "image.jpg",
      "Islamabad",
      "Description"
    );

    // 7. Approve in registry — moves status PENDING → LISTED
    await registry.approveProperty(0);
  });

  it("Should create fractional listing", async function () {
    await fractional.createFractional(0, "Token", "TKN", 100, 1);

    const listing = await fractional.listings(0);
    expect(listing.totalShares).to.equal(100n);
  });

  it("Should allow buying shares", async function () {
    await fractional.createFractional(0, "Token", "TKN", 100, 1);

    await fractional.connect(user).buyShares(0, 10, { value: 10 });

    const listing = await fractional.listings(0);
    expect(listing.remainingShares).to.equal(90n);
  });
});