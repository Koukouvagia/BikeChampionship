# Bike Tournament

Bike Tournament repo is about an REST api service which handle not only the easy and secure registration but also managing and saving the data of many bike teams, cyclists, medicals and mechanics who will participate in this type of event.

# Technologies and Tools

The api is built with Node.js and Express.js framework. For data transactions responsible is MongoDB. Passport is the meister chief in authentication with JWT

# Database and Models
Schema-model building with Mongoose. 
Included Models are: Team, Cyclist, Medical, Mechanic, Participant, personInfo, Jwt(token)

# Authentication on Registration

In order to participate a client (cyclist-medical-mechanic) and his team on this event, he is needed to sign up.Signing up with some required data, an
acces token is generated, his password is being saved hashed in MongoDB. In step two, he needs to login and make request to all endpoints in order to participate.
Access token is gonna be expired and he will need to login again after 1 day.

# Endpoints

Client can make request to endpoints with CRUD operations which are about Team, Cyclist, Medical, Participant And personInfo.

For example client can make a POST request for creating a team, a GET for getting a team , etc...

# Inheritance

Team models has many fields icluded 3 fields Cyclist,Medical and Mechanic which are ObjectIds typo.This means that when a cyclist document changes ,team who has this cyclist objectId fields changes too.
The path continues in a same way with Cyclist including Participant field, participant model including personInfo field. In other words field depth reaches level 4

------------------------------------------------------------------------------------------------------------------------------

# Installation Guide

1. Install Docker from https://docs.docker.com/install/
2. Open your terminal-console
3. Navigate inside the ~/bike-tournament/ directory
4. To build and run type: $ docker-compose up -d --build
