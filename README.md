# Create Social Network ![npm](https://img.shields.io/npm/dm/create-social-network) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)

Kache is a educational project. The main idea is to demonstrate how one can build a large scalable project with Javascript. However you get the core functionality of social network by running one command and then you can build more on top of that.

Repository is divided into three main packages:

- **api** This package contains API for Social Networking App, built with Nodejs, Express, GraphQL, Apollo Server and MongoDB with Mongoose.
- **frontend** Is a frontend for Social Networking App, built with React, GraphQL, Apollo Client and Styled Components.
- **lib** Is a Nodejs command line script, that helps users to install the Social Networking App with one command. This package is published to NPM as a `create-social-network`

## Features

- **Messenger** Real time messaging system.
- **Notifications** Get instant notification when someone follows/messages you or likes/comments on your post.
- **User Status** Check if user is Online or not in real time.
- **News Feed** Fresh posts from people you are following.
- **Explore** New Posts and People.
- **Follow** a particular user and get notified for their activity.
- **Personalize Profile** With profile/cover photo and personal posts.
- **Authentication & Authorization** with Password reset functionality.

## Demo


## Screenshots of the app

|                                        Home                                        |                                        Messages                                        |                                        Profile                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://res.cloudinary.com/dkkf9iqnd/image/upload/v1573322911/home_nmms37.png) | ![](https://res.cloudinary.com/dkkf9iqnd/image/upload/v1573322910/messages_kt8gts.png) | ![](https://res.cloudinary.com/dkkf9iqnd/image/upload/v1573322910/profile_nzntwk.png) |

|                                        People                                        |                                        Explore                                        |                                        Notifications                                        |
| :----------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
| ![](https://res.cloudinary.com/dkkf9iqnd/image/upload/v1573322911/people_ag2to0.png) | ![](https://res.cloudinary.com/dkkf9iqnd/image/upload/v1573322912/explore_uewztd.png) | ![](https://res.cloudinary.com/dkkf9iqnd/image/upload/v1573322910/notifications_yfxweb.png) |

## Quick Installation

```sh
git clone https://github.com/orvi2014/kache-webapp
cd kache-webapp
npm start
```
Inside that directory, it will generate the initial project structure and install dependencies.

```
my-network
├── api
├── frontend
├── node_modules
├── .gitignore
├── netlify.toml
├── package.json
├── README.md
```

The app is organized as [Monorepo](https://en.wikipedia.org/wiki/Monorepo) using [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)

