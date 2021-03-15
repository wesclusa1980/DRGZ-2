require('dotenv').config()

const {
    Client,
    PrivateKey,
    AccountCreateTransaction,
    AccountId,
} = require("@hashgraph/sdk");

const createAccount = async () => {

    const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
    const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);

    const privateKey = await PrivateKey.generate();
    const publicKey = privateKey.publicKey;

    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);

    const transaction = new AccountCreateTransaction()
    .setKey(publicKey)
    .setInitialBalance(0)

    const txResponse = await transaction.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the account ID
    const newAccountId = receipt.accountId;

    console.log("The new account ID is " +newAccountId);
    console.log("The privateKey is " +privateKey.toString());
    console.log("The new publicKey is " +publicKey.toString());
    console.log("The privateKey is Without " +privateKey);


}

createAccount();