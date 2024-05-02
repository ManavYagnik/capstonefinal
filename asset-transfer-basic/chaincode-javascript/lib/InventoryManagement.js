'use strict';

const { Contract } = require('fabric-contract-api');

class InventoryManagementContract extends Contract {

    async init(ctx) {
        console.log('InventoryManagementContract initialized');
    }

    async addInventoryItem(ctx, itemID, itemName, quantity, location) {
        const existingItem = await ctx.stub.getState(itemID);
        if (existingItem && existingItem.length > 0) {
            throw new Error(`Inventory item with ID ${itemID} already exists`);
        }
        const item = {
            itemID: itemID,
            itemName: itemName,
            quantity: quantity,
            location: location
        };
        await ctx.stub.putState(itemID, Buffer.from(JSON.stringify(item)));
        return JSON.stringify(item);
    }

    async updateInventoryQuantity(ctx, itemID, newQuantity) {
        const itemBytes = await ctx.stub.getState(itemID);
        if (!itemBytes || itemBytes.length === 0) {
            throw new Error(`Inventory item with ID ${itemID} not found`);
        }
        const item = JSON.parse(itemBytes.toString());
        item.quantity = newQuantity;
        await ctx.stub.putState(itemID, Buffer.from(JSON.stringify(item)));
        return JSON.stringify(item);
    }

    async transferInventoryItem(ctx, itemID, newLocation) {
        const itemBytes = await ctx.stub.getState(itemID);
        if (!itemBytes || itemBytes.length === 0) {
            throw new Error(`Inventory item with ID ${itemID} not found`);
        }
        const item = JSON.parse(itemBytes.toString());
        item.location = newLocation;
        await ctx.stub.putState(itemID, Buffer.from(JSON.stringify(item)));
        return JSON.stringify(item);
    }

    async getInventoryItem(ctx, itemID) {
        const itemBytes = await ctx.stub.getState(itemID);
        if (!itemBytes || itemBytes.length === 0) {
            throw new Error(`Inventory item with ID ${itemID} not found`);
        }
        return itemBytes.toString();
    }
}

module.exports = InventoryManagementContract;
