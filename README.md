# posts-serverless-API
REST API for post app built with Serverless framework

User Portal

 - Register, Sign In, sign out, verify user, and forget password
 - Create a post where the post can be private post (only the user can see it ) or a public post where others can see and comment on it
 - Users can only delete posts and comments of their own
 - Front-end app of your own choice to interact with the APIs
 - Authentication process using AWS Cognito

Admin Portal

 - Admin can disable users from login
 - Admin can reset user passwords
 - Admin has a dashboard to see overview statistics about user posts (number of users, number of posts, number of posts per user, number of comments per post) 
 

# Getting Started with Serverless Post App

## Setup

Create an AWS IAM account and then:

```
npm install
export AWS_ACCESS_KEY_ID=<your-key-here>
export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>
serverless deploy
```



