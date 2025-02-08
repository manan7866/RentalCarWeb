"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
// sanityClient.ts
var client_1 = require("@sanity/client");
exports.client = (0, client_1.createClient)({
    projectId: 'djhh34x5', // Replace with your project ID
    dataset: 'production', // Or your dataset name
    apiVersion: '2025-01-24', // Today's date or latest API version
    useCdn: false, // Disable CDN for real-time updates
    token: "sknfFATS5CXl1Pg5wCDJ81pGT4S0ZjzF70knVOuQL72e0OcKdO6hOFLZrgTuMZJ1FOtSLeww8HTA6zqDv7l1xclreZ39nsDuFBizgpHQ8X93iUJhT8mNfwNQ51pTxEoltnGfT351aOTQM9wwQiZHnceTckb0wBIrcshlx4cajB1dSaXotiWu"
});