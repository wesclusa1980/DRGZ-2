import {TransferTransaction, AccountId, PrivateKey} from "@hashgraph/sdk"
import { _toArray } from "react-payment-inputs/lib/chunk-a9f30d9c";
import {client, tokenId, accountId} from "../../utils/hedera-treasury";
export default async function topup(req, res) {
    console.log("Request", req.body);
    const {count, recieverAccountid, senderAccountID, senderPK} = req.body;
    try{
        const total = Number(`-${count}`);
        console.log(total);
        const AccId = AccountId.fromString(senderAccountID)
        console.log(AccId)

        const PKId = PrivateKey.fromString(senderPK)
        console.log('PKId', PKId)

        console.log("fresh ",accountId);

        const transaction = await new TransferTransaction()
            .addTokenTransfer(tokenId, AccId, total)
            .addTokenTransfer(tokenId, accountId, count)
            .freezeWith(client);

        console.log('transaction');
    
        //Sign with the sender account private key
    
        const signTx = await transaction.sign(PKId);

        console.log('signTx');
    
        //Sign with the client operator private key and submit to a Hedera network
    
        const txResponse = await signTx.execute(client);

        console.log('txResponse');
    
        //Request the receipt of the transaction
    
        const receipt = await txResponse.getReceipt(client);

        console.log('receipt');
    
        //Obtain the transaction consensus status
    
        const transactionStatus = receipt.status;

        console.log('transactionStatus');
    
        console.log("The transaction consensus status " +transactionStatus.toString());
        
        res.status(200).json({ transfer: transactionStatus.toString() });

    } catch (error) {
        console.error(error);
        res.status(error.requestResult.statusCode).send(error.message);
    }
}
