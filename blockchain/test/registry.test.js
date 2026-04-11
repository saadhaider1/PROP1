const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RealEstateRegistry", function () {
  let registry, cda, owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    // 1. Deploy Registry
    const Registry = await ethers.getContractFactory("RealEstateRegistry");
    registry = await Registry.deploy();
    await registry.waitForDeployment();

    // 2. Deploy CDA
    const CDA = await ethers.getContractFactory("CDAAuthority");
    cda = await CDA.deploy(owner.address);
    await cda.waitForDeployment();

    // 3. Wire CDA into Registry — MUST happen before listProperty
    await registry.setCDAAuthority(await cda.getAddress());

    // 4. Pre-approve property ID 0 before listing
    await cda.approveProperty(0);
  });

  it("Should register property", async function () {
    await registry.listProperty(
      1000,
      "Awan House",
      "house",
      "image.jpg",
      "Islamabad",
      "Description"
    );

    const property = await registry.getProperty(0);
    expect(property.owner).to.equal(owner.address);
    expect(property.price).to.equal(1000n);
  });

  it("Should move property to LISTED after approveProperty", async function () {
    await registry.listProperty(
      1000,
      "Awan House",
      "house",
      "image.jpg",
      "Islamabad",
      "Description"
    );

    await registry.approveProperty(0);

    const property = await registry.getProperty(0);
    // Status enum: NONE=0, PENDING=1, LISTED=2, SOLD=3, FRACTIONALIZED=4, UNLISTED=5
    expect(property.status).to.equal(2n);
  });

  it("Should allow buying a listed property", async function () {
    const [, buyer] = await ethers.getSigners();

    await registry.listProperty(
      1000,
      "Awan House",
      "house",
      "image.jpg",
      "Islamabad",
      "Description"
    );

    await registry.approveProperty(0);

    await registry.connect(buyer).buyProperty(0, { value: 1000 });

    const property = await registry.getProperty(0);
    expect(property.owner).to.equal(buyer.address);
    // Status.SOLD = 3
    expect(property.status).to.equal(3n);
  });
});