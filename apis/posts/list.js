'use strict'

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event, context, callback) => {

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

            const postAndCommentList = postList.map(post => {
                return {
                    ...post,
                    commentList: commentList.filter(comment => {
                        return comment.postId == post.id
                    })
                }
            })

            const response = {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-*": "*",
                },
                body: JSON.stringify({
                    postAndCommentList
                })
            }

            callback(null, response)

        })

    })

}



