'use strict'

const AWS = require("aws-sdk");
const uuid = require("uuid");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { validateRequiredInputs, CONSTANTS } = require("../../core/index");

module.exports.create = (event, context, callback) => {

    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    console.log(JSON.stringify(data))

    validateRequiredInputs(data, CONSTANTS.createComment);

    const params = {
        TableName: "comments",
        Item: {
            id: uuid.v1(),
            postId: data.postId,
            body: data.body,
            username: data.username,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    }

    dynamoDb.put(params, (error, result) => {
        if (error) {
            console.error(error);
            callback(new Error("Couldn\'t create comment item."))
            return;
        }

        console.log(JSON.stringify(result))

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        }

        callback(null, response)

    })

}