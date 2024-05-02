'use strict';

const { Contract } = require('fabric-contract-api');

class PaymentSettlementContract extends Contract {

    async init(ctx) {
        console.log('PaymentSettlementContract initialized');
    }

    async initiatePayment(ctx, paymentID, orderID, amount, payerID, payeeID) {
        const existingPayment = await ctx.stub.getState(paymentID);
        if (existingPayment && existingPayment.length > 0) {
            throw new Error(`Payment with ID ${paymentID} already exists`);
        }
        const payment = {
            paymentID: paymentID,
            orderID: orderID,
            amount: amount,
            payerID: payerID,
            payeeID: payeeID,
            status: 'Initiated'
        };
        await ctx.stub.putState(paymentID, Buffer.from(JSON.stringify(payment)));
        return JSON.stringify(payment);
    }

    async verifyPayment(ctx, paymentID) {
        const paymentBytes = await ctx.stub.getState(paymentID);
        if (!paymentBytes || paymentBytes.length === 0) {
            throw new Error(`Payment with ID ${paymentID} not found`);
        }
        const payment = JSON.parse(paymentBytes.toString());
        payment.status = 'Verified';
        await ctx.stub.putState(paymentID, Buffer.from(JSON.stringify(payment)));
        return JSON.stringify(payment);
    }

    async getPayment(ctx, paymentID) {
        const paymentBytes = await ctx.stub.getState(paymentID);
        if (!paymentBytes || paymentBytes.length === 0) {
            throw new Error(`Payment with ID ${paymentID} not found`);
        }
        return paymentBytes.toString();
    }
}

module.exports = PaymentSettlementContract;
