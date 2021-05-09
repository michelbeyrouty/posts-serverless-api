'use strict'

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {

    const data = JSON.parse(event.body);

    const params = {
        TableName: "posts",
        Key: {
            id: event.pathParameters.id
        }
    }

    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.error(error);
            callback(new Error("Couldn\'t fetch post item."))
            return;
        }

        if (result.Item.username == data.username) {
            dynamoDb.delete(params, (error, result) => {
                if (error) {
                    console.error(error);
                    callback(new Error("Couldn\'t delete post item."))
                    return;
                }

                const response = {
                    statusCode: 200,
                    body: JSON.stringify(result.Item)
                }

                callback(null, response)

            })
        } else {
            console.error(error);
            callback(new Error("User " + data.username + " cannot delete post"))
            return;
        }

    })



}