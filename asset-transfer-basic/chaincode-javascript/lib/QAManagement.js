'use strict';

const { Contract } = require('fabric-contract-api');

class QualityAssuranceContract extends Contract {

    async init(ctx) {
        console.log('QualityAssuranceContract initialized');
    }

    async recordQualityAssessment(ctx, productID, assessorID, assessmentResult, assessmentDate, remarks) {
        const productBytes = await ctx.stub.getState(productID);
        if (!productBytes || productBytes.length === 0) {
            throw new Error(`Product with ID ${productID} not found`);
        }
        const product = JSON.parse(productBytes.toString());
        const assessment = {
            assessorID: assessorID,
            assessmentResult: assessmentResult,
            assessmentDate: assessmentDate,
            remarks: remarks
        };
        product.qualityAssessments.push(assessment);
        await ctx.stub.putState(productID, Buffer.from(JSON.stringify(product)));
        return JSON.stringify(product);
    }

    async issueCertification(ctx, productID, certifyingOrganization, certificationDate, expirationDate, remarks) {
        const productBytes = await ctx.stub.getState(productID);
        if (!productBytes || productBytes.length === 0) {
            throw new Error(`Product with ID ${productID} not found`);
        }
        const product = JSON.parse(productBytes.toString());
        const certification = {
            certifyingOrganization: certifyingOrganization,
            certificationDate: certificationDate,
            expirationDate: expirationDate,
            remarks: remarks
        };
        product.certifications.push(certification);
        await ctx.stub.putState(productID, Buffer.from(JSON.stringify(product)));
        return JSON.stringify(product);
    }

    async getProductQualityAssessments(ctx, productID) {
        const productBytes = await ctx.stub.getState(productID);
        if (!productBytes || productBytes.length === 0) {
            throw new Error(`Product with ID ${productID} not found`);
        }
        const product = JSON.parse(productBytes.toString());
        return JSON.stringify(product.qualityAssessments);
    }

    async getProductCertifications(ctx, productID) {
        const productBytes = await ctx.stub.getState(productID);
        if (!productBytes || productBytes.length === 0) {
            throw new Error(`Product with ID ${productID} not found`);
        }
        const product = JSON.parse(productBytes.toString());
        return JSON.stringify(product.certifications);
    }
}

module.exports = QualityAssuranceContract;
