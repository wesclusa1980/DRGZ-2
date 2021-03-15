require("dotenv").config();

const { Client, PrivateKey, AccountId } = require("@hashgraph/sdk");

console.log("PK", process.env.PRIVATE_KEY)
console.log("Calling hedera JS")
//console.log("PK", "02e020100300506032b657004220420063dbbf0d5c090006dd95fd651519e30a345d8a8c0f72d35901ae444014d220e")
export const tokenId = process.env.TOKENID;
export const accountKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
export const accountId = AccountId.fromString(process.env.ACCOUNT_ID);
export const client = Client.forTestnet().setOperator(accountId, accountKey);
export const PRIVATE_KEY = process.env.PRIVATE_KEY
