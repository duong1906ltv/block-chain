const PubNub = require("pubnub");

const credentials = {
	publishKey: "pub-c-35da4ae6-4c7c-4e09-a413-281b439587b4",
	subscribeKey: "sub-c-6e7aee78-c27f-4017-bad5-2b798ab30f02",
	uuid: "sec-c-NTM3YzAxN2MtNjY1OC00Mjg5LWIwNDAtZGMyYjBiNjljZDQy",
};

const CHANNELS = {
	TEST: "TEST",
	BLOCKCHAIN: "BLOCKCHAIN",
	TRANSACTION: "TRANSACTION",
};

class PubSub {
	constructor({ blockchain, transactionPool, wallet }) {
		this.blockchain = blockchain;
		this.transactionPool = transactionPool;
		this.wallet = wallet;

		this.pubnub = new PubNub(credentials);
		this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
		this.pubnub.addListener(this.listener());
	}

	handleMessage(channel, message) {
		// console.log(
		// 	`Message received. Channel: ${channel}. Message: ${message}`
		// );

		const parsedMessage = JSON.parse(message);

		switch (channel) {
			case CHANNELS.BLOCKCHAIN:
				this.blockchain.replaceChain(parsedMessage, true, () => {
					this.transactionPool.clearBlockchainTransactions({
						chain: parsedMessage,
					});
				});
				break;
			case CHANNELS.TRANSACTION:
				if (
					!this.transactionPool.existingTransaction({
						inputAddress: this.wallet.publicKey,
					})
				) {
					this.transactionPool.setTransaction(parsedMessage);
				}
				break;
			default:
				return;
		}
	}

	listener() {
		return {
			message: (messageObject) => {
				const { channel, message } = messageObject;

				this.handleMessage(channel, message);
			},
		};
	}

	publish({ channel, message }) {
		this.pubnub.publish({ channel, message });
	}

	broadcastChain() {
		this.publish({
			channel: CHANNELS.BLOCKCHAIN,
			message: JSON.stringify(this.blockchain.chain),
		});
	}

	broadcastTransaction(transaction) {
		this.publish({
			channel: CHANNELS.TRANSACTION,
			message: JSON.stringify(transaction),
		});
	}
}

module.exports = PubSub;
