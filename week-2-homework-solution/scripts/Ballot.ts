import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";

import * as dotenv from "dotenv";
dotenv.config();

// Your public API KEY
const ADDRESS = "*Fill with your wallet address*";

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  console.log(`Connected to the address ${wallet.address}`);
  console.log(`ALCHEMY API KEY: ${process.env.ALCHEMY_API_KEY?.length}`);

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.ALCHEMY_API_URL
  );

  const lastBlock = await provider?.getBlock("latest");
  console.log(`Connected to the block number ${lastBlock?.number}`);

  const signer = wallet.connect(provider);

  const balance = await signer.getBalance();
  console.log(`Balance is: ${balance} WEI`);

  const proposals = process.argv.slice(2);
  console.log(proposals);

  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

  const ballotFactory = new Ballot__factory(signer);

  const ballotContract = await ballotFactory.deploy(
    proposals.map(ethers.utils.formatBytes32String)
  );

  await ballotContract.deployed();
  console.log(
    `The ballot contract was deployed at the address ${ballotContract.address}`
  );

  const chairperson = await ballotContract.chairperson();
  console.log(`The chairperson for this ballot is ${chairperson}`);
  console.log(`Giving voting rights to: ${ADDRESS}`);

  const giveRightToVoteTx = await ballotContract.giveRightToVote(ADDRESS);
  const giveRightToVoteTxReceipt = await giveRightToVoteTx.wait();
  console.log(
    `Transaction completed at block ${giveRightToVoteTxReceipt.blockNumber} with hash ${giveRightToVoteTxReceipt.blockHash}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
