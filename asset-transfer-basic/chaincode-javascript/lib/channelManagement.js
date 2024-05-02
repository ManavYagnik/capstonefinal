'use strict';

const { Contract } = require('fabric-contract-api');

class ChannelManagementContract extends Contract {

    async createChannelAndEnrollParticipant(ctx, participantID, channelName) {
        // Check if the participant exists
        const participantExists = await this.participantExists(ctx, participantID);
        if (!participantExists) {
            throw new Error(`Participant with ID ${participantID} does not exist`);
        }

        // Create a new channel
        const channel = await this.createChannel(ctx, channelName);

        // Add the participant to the channel
        await this.addParticipantToChannel(ctx, participantID, channelName);

        // Return the channel information
        return {
            channelName: channelName,
            participantID: participantID,
            message: `Participant ${participantID} added to channel ${channelName}`
        };
    }

    async createChannel(ctx, channelName) {
        // Implement channel creation logic here
        // This could involve calling Fabric SDK or CLI commands
        ctx.stub.createChannel(channelName);
        // This function returns the newly created channel
    }

    async addParticipantToChannel(ctx, participantID, channelName) {
        // Implement participant enrollment logic here
        // This could involve updating the channel configuration
        ctx.stub.updateChannelConfig(channelName, participantID);
    }

    async participantExists(ctx, participantID) {
        // Implement participant existence check logic here
        // This could involve querying the participant registry
        const participant = await ctx.stub.getState(participantID);
        if (participant && participant.length > 0) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = ChannelManagementContract;
