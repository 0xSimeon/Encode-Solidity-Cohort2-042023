import { expect } from "chai";
import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import { HelloWorld } from "../typechain-types";

describe("HelloWorld", () => {
  let helloWorldContract: HelloWorld;

  beforeEach(async () => {
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    helloWorldContract = (await helloWorldFactory.deploy()) as HelloWorld;
    await helloWorldContract.deployed();
  });

  it("Should give a Hello World", async () => {
    const helloWorldText = await helloWorldContract.helloWorld();
    expect(helloWorldText).to.equal("Hello World");
  });

  it("Should set owner to deployer account", async () => {
    const signers = await ethers.getSigners();
    const deployer = signers[0].address;
    const owner = await helloWorldContract.owner();
    expect(owner).to.eq(deployer);
  });

  it("Should  not allow anyone other than owner to call transferOwnership", async () => {
    const accounts = await ethers.getSigners();
    await expect(
      helloWorldContract
        .connect(accounts[1])
        .transferOwnership(accounts[1].address)
    ).to.be.rejectedWith("Caller is not the owner");
  });
});
