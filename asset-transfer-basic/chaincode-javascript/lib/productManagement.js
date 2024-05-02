'use strict';

const { Contract } = require('fabric-contract-api');

class ProductManagementContract extends Contract {

    async init(ctx) {
        console.log('ProductManagementContract initialized');
    }

    async registerProduct(ctx, productID, productName, ownerID, productionDate, expirationDate, batchNumber, location) {
        const existingProduct = await ctx.stub.getState(productID);
        if (existingProduct && existingProduct.length > 0) {
            throw new Error(`Product with ID ${productID} already exists`);
        }
        const product = {
            productID: productID,
            productName: productName,
            ownerID: ownerID,
            productionDate: productionDate,
            expirationDate: expirationDate,
            batchNumber: batchNumber,
            location: location,
            status: 'Registered',
            history: []
        };
        await ctx.stub.putState(productID, Buffer.from(JSON.stringify(product)));
        return JSON.stringify(product);
    }

    async updateProductStatus(ctx, productID, newStatus) {
        const productBytes = await ctx.stub.getState(productID);
        if (!productBytes || productBytes.length === 0) {
            throw new Error(`Product with ID ${productID} not found`);
        }
        const product = JSON.parse(productBytes.toString());
        product.status = newStatus;
        product.history.push({
            timestamp: new Date(),
            status: newStatus
        });
        await ctx.stub.putState(productID, Buffer.from(JSON.stringify(product)));
        return JSON.stringify(product);
    }

    async getProduct(ctx, productID) {
        const productBytes = await ctx.stub.getState(productID);
        if (!productBytes || productBytes.length === 0) {
            throw new Error(`Product with ID ${productID} not found`);
        }
        return productBytes.toString();
    }

    async getProductHistory(ctx, productID) {
        const productBytes = await ctx.stub.getState(productID);
        if (!productBytes || productBytes.length === 0) {
            throw new Error(`Product with ID ${productID} not found`);
        }
        const product = JSON.parse(productBytes.toString());
        return JSON.stringify(product.history);
    }
}

module.exports = ProductManagementContract;
