'use strict';

const { Contract } = require('fabric-contract-api');

class OrderManagementContract extends Contract {

    async init(ctx) {
        console.log('OrderManagementContract initialized');
    }

    async createOrder(ctx, orderID, productID, quantity, buyerID, sellerID) {
        const existingOrder = await ctx.stub.getState(orderID);
        if (existingOrder && existingOrder.length > 0) {
            throw new Error(`Order with ID ${orderID} already exists`);
        }
        const order = {
            orderID: orderID,
            productID: productID,
            quantity: quantity,
            buyerID: buyerID,
            sellerID: sellerID,
            status: 'Created',
            history: []
        };
        await ctx.stub.putState(orderID, Buffer.from(JSON.stringify(order)));
        return JSON.stringify(order);
    }

    async updateOrderStatus(ctx, orderID, newStatus, chainID) {
        const orderBytes = await ctx.stub.getState(orderID);
        if (!orderBytes || orderBytes.length === 0) {
            throw new Error(`Order with ID ${orderID} not found`);
        }
        const order = JSON.parse(orderBytes.toString());
        order.status = newStatus;
        order.history.push({
            timestamp: new Date(),
            status: newStatus,
            chainID: chainID
        });
        await ctx.stub.putState(orderID, Buffer.from(JSON.stringify(order)));
        return JSON.stringify(order);
    }

    async getOrder(ctx, orderID) {
        const orderBytes = await ctx.stub.getState(orderID);
        if (!orderBytes || orderBytes.length === 0) {
            throw new Error(`Order with ID ${orderID} not found`);
        }
        return orderBytes.toString();
    }

    async getOrderHistory(ctx, orderID) {
        const orderBytes = await ctx.stub.getState(orderID);
        if (!orderBytes || orderBytes.length === 0) {
            throw new Error(`Order with ID ${orderID} not found`);
        }
        const order = JSON.parse(orderBytes.toString());
        return JSON.stringify(order.history);
    }
}

module.exports = OrderManagementContract;
