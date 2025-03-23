import { ethers } from "hardhat";

async function main() {
  const MessageLog = await ethers.getContractFactory("MessageLog");
  const messageLog = await MessageLog.deploy();

  await messageLog.deployed();

  console.log(`MessageLog deployed to ${messageLog.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
