'use strict'

const AWS = require("aws-sdk");
const _ = require("lodash")
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {

    const postScanParams = {
        TableName: "posts",
    }

    const commentScanParams = {
        TableName: "comments",
    }

    dynamoDb.scan(postScanParams, (error, postResult) => {

        if (error) {
            console.error(error);
            callback(new Error("Couldn\'t fetch post items."))
            return;
        }


        dynamoDb.scan(commentScanParams, (error, commentResult) => {

            if (error) {
                console.error(error);
                callback(new Error("Couldn\'t fetch comment items."))
                return;
            }

            const postList = postResult.Items
            const commentList = commentResult.Items

            const userTableData = {}

            const usersList = _.uniqBy(postList.concat(commentList), 'username').map(post => {
                return {
                    username: post.username
                }
            });
            
            userTableData["userList"] = usersList.map(user => {
                return {
                    username: user.username,
                    numberOfPosts: postList.filter(post => post.username === user.username).length,
                    numberOfComments: commentList.filter(comment => comment.username === user.username).length,
                }
            })
            
            userTableData["totalComments"] = commentList.length
            userTableData["totalPosts"] = postList.length

            const response = {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-*": "*",
                },
                body: JSON.stringify({
                    userTableData
                })
            }

            callback(null, response)

        })

    })

}



