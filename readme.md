# Feeld Frontend Coding Challenge
By Jón Rúnar Helgason.

# Original Challenge Description

Hi! welcome to Feeld. As part of the recruitment process we want to know how you think, code and structure your work. In order to do that, we're going to ask you to complete this coding challenge. 

## Some background

Feeld is a dating app. People are free to browse profiles and decide whether they like them or not. 

## What we expect

* Build a performant, clean and well structured solution;
* Commit early and often. We want to be able to check your progress;
* Feel free to address the problem creatively according to your programming tastes (there are always multiple ways to achieve the same goal) and try to use elegant solutions.
* Feeld.co is a design-driven app. Your solution should look *modern, relevant, simple and in line with our brand image*
* Go the extra mile. The requirements below are just the bare minimum. Be creative and come up with a solution that will impress us. If you think our requirements are whack, or not appropriate, change them and explain why
* You have **one week** to complete this challenge

## The Challenge

Our backend team has created an API that will give you a bunch of user profiles, and you have been given some (very lose) requirements from the product team

* You must build an app that displays these users in an atractive way (think Tinder, Grindr, Happn, Hinge)
* The API will return the following information about a user:

```
{
    "id": "55be3c8fc964860700ebf515",
    "info": {
        "age": 20,
        "type": "single",
        "gender": "male",
        "sexuality": "straight",
        "name": "D",
        // a short text about them
        "about": "\"Tell us more about you\"",
        // a list of desires
        "desires": [
            "Food"
        ],
        // a list of tags they're interested in
        "interests": [
            "Food"
        ]
    },
    "associated": null, // if they're a couple, this will be populated
    "photos": [ // this will be a list of zero or more photos
        {
            "url": "...",
            "width": 716,
            "height": 716
        }
    ]
}
```

* A user should be able to make a decision (Like or Dislike) on the user, but they don't *have* to, i.e. they can skip the profile.
* The user should be able to browse another user's photos

## Accessing the API

API Root URL: https://fld-devtest-api.herokuapp.com

The API is authenticated using the following session token that must be supplied in the HTTP request headers (using the `session-token` key):

```
3TtY+AVtEJMaOPWGyEulVEgVBWZ8gqM75gag6wCcA3rJCYWMkX/ZmAOJxrZ4bPyBLJBch7VyMYD8ZCWoNPCUnJbT5M2iRWjJteGrfNhFzd+0oDbWQwiNAIdG0W9rHw7sKAAWk5uEzjs+lPykJnmy56LRwSFpoyxHC7p9G3KTQoQ=
```

### Endpoints

There's only one—`/api/v1/users`—which will return 20 unique users picked at random from a set of 100 users. You can call this endpoint using Curl as follows:

```
curl -H 'session-token: 3TtY+AVtEJMaOPWGyEulVEgVBWZ8gqM75gag6wCcA3rJCYWMkX/ZmAOJxrZ4bPyBLJBch7VyMYD8ZCWoNPCUnJbT5M2iRWjJteGrfNhFzd+0oDbWQwiNAIdG0W9rHw7sKAAWk5uEzjs+lPykJnmy56LRwSFpoyxHC7p9G3KTQoQ=' \
https://fld-devtest-api.herokuapp.com/api/v1/users
```

## Your task:

1. Fork this repo
2. Produce an expo React Native app that calls the provided API and displays users. Make it public and send us a link so we can open it
3. Create a readme file explaining your technical choices, architecture and if you have them, your ideas and suggestions.
4. Send us a PR.

GOOD LUCK!

