---
title: "Is your API usable?"
date: 2022-07-10T18:45:18-04:00
draft: true
---

<!-- 
outline

Introduction for UX design principles (Don Norman? Maybe Nielsen/Norman stuff)
Complaint that no one prioritizes these principles when designing APIs, esp. when building internally
Or hey, use some of the list from HCI, talk about your masters degree?

Dive into each principle, why it's important, and how APIs can follow it.
https://www.nngroup.com/articles/ten-usability-heuristics/

1. Visibility 

Do your API users understand the state of your system from your response?
Proper use of HTTP Error Codes, don't return 500.
Proper error reporting and feedback

Here's a bad example: Error 400 with no context
Here's an idealistic error message from RFC 7807: https://datatracker.ietf.org/doc/html/rfc7807
   HTTP/1.1 400 Bad Request
   Content-Type: application/problem+json
   Content-Language: en

   {
   "type": "https://example.net/validation-error",
   "title": "Your request parameters didn't validate.",
   "invalid-params": [ {
                         "name": "age",
                         "reason": "must be a positive integer"
                       },
                       {
                         "name": "color",
                         "reason": "must be 'green', 'red' or 'blue'"}
                     ]
   }

Compare the two responses and their visibility

3. Recoverable

Undo buttons? Allow the user to explore without consequence
Dry run options

4. Standards

Inter and Intra

5. Documentation

Prevent your users from making mistakes or slips (quickly define slips and mistakes?)

6. Discoverability

Goal: Users only have to learn your API once

7. Minimalism

Keep it simple stupid. Grug hate complexity

 -->

## It's all about communication

# TODO: Cleanup intro

A traditional user interface has many different methods of communicating with it's user. My iPhone has a screen, speaker, vibrator, physical switches, and a camera flash that all get used for the notification system. With so many modalities to communicate through, it's no wonder the user experience is robust and intuitive. APIs have very few methods of communication and they're essentially all the same version of plaintext or encodings. This makes for an interesting design challenge, how can we create robust user experiences with our limited communication ability?

Taking [Georgia Tech's Human Computer Interaction](https://omscs6750.gatech.edu/) course recently opened my eyes to all the usability violations I commonly see in APIs. Namely the APIs that are never meant to be seen by the public. APIs are a human-computer interaction when being developed and used, so we should follow user centric design heuristics to create a better developer experience, and ultimately better organized APIs.

So how can we approach API design, something inherently technical and in the weeds, with user centric design?Let's look at some of the design heuristics taught by Professor Joyner in HCI and apply them to backend web development. If you're interested, you can out check the [course website](https://omscs6750.gatech.edu/).

## Visibility

Visibility, also called perceptibility, is the ability for your user to understand the state of the system. HTTP already has a status code for developers to use but leaves out a tremendous amount of detail when used alone. A 400 error could be many things when implemented properly and hundreds of things when used instead of more detailed 4xx error codes.

When it comes to errors, [RFC 7807 "Problem Details for HTTP APIs"](https://datatracker.ietf.org/doc/html/rfc7807) details a fantastic method for exposing system state:

```json
HTTP 400 Bad Request
Content-Type: application/problem+json
Content-Language: en

{
"type": "https://example.net/validation-error",
"title": "Your request parameters didn't validate.",
"invalid-params": [{
    "name": "age",
    "reason": "must be a positive integer"
  },
  {
    "name": "color",
    "reason": "must be 'green', 'red' or 'blue'"
  }]
}
```

The level of detail here is what gives the user the ability to see into the system. It's clear what went wrong and what needs to be done to fix it. Recently I hit an API that I was unfamiliar with, Azure Blob Storage, and received a blank `409: Conflict' as a response. I barely knew what the endpoint was doing, how was I expected to know what piece of system state conflicted with what I wanted to achieve?

{{% aside %}}
Another bonus for detailed error messages is enabling your frontend to provide more visibility for the end user. An end user will appreciate an error message like "Please enter a valid color (green, red, or blue)" over a vague "Error. Please try again."
{{% /aside %}}

<!-- ## Tolerance

Tolerance is what makes a user feel safe using your API. Ideally, nothing is permanent. More feasibly, most things are not permanent and the permanent things have a "dry run" option. Having a tolerant API means the developer using it can run through a usual "let's see what this button does" curiosity without pain. Your users can learn your API faster this way because they won't be afraid of permanent, breaking changes.

When your API receives a `DELETE` call, what does it do, and how should the user be aware of that? If a user delete a root resource, and that cascades throughout some of its children silently, your user can be left wondering what happened to the system. I'd propose a dry-run option, `DELETE /resource?dry-run` that returns a body something like this:

```json
HTTP 200 OK
Content-Type: application/json
Content-Language: en

{
"actions": [
  {
    "op": "DELETE",
    "resource": "/resource1/id"
  },
  {
    "op": "DELETE",
    "resource": "/resource2/id"
  },
  {
    "op": "ARCHIVE",
    "resource": "/resource3/id"
  },
]
}
```

Note, the actual schema isn't what I'm getting at. The idea is we're communicating to the user what would happen, and providing them a method for exploration of our API. Here our user can try our endpoint with no risk, and see if they like the result. -->

## Consistency

TODO: Graphic on consistency's effect on learning curves.

By being consistent with the industry standards and within our own API, we can leverage user's past experiences to decrease our APIs learning curve. For an example of industry standard endpoints, let's look at a few social media endpoints for programmatically creating a status update:

| Platform         | Endpoint                                              |
|------------------|-------------------------------------------------------|
| Twitter          | `POST /statuses/update`                               |
| Facebook (pages) | `POST /{feedID}/feed`                                 |
| Instagram        | `POST /{userID}/media` then `POST /{userID}/media_publish` |

Knowing these, what do you think the endpoint is for posting a status update on Mastodon is? Our previous experience says it should be a `POST`, have something to do with a `status`. In fact, it's `POST /api/v1/statuses`. See how easy that was! Consistency allows us to make easy guesses at what things *should* be, and discover the exacts of it faster. This *inter*-api consistency allows the user to leverage previous experience and become familiar with our API before ever using it.

Another form of consistency is intra-api. Having consistency within your own endpoints allows for users to have one learning curve for your whole API, rather than having to learn each individual endpoint. Usually you'll see people describe endpoints in a similar manner of `VERB /some-baseroute/resource`. Not only will this let users learn endpoints before even using them, they may be able to deduct what a route does before ever using it.

Here's an example of a public API I've had to use before that is internally consistent, but externally inconsistent.

| Effect | Endpoint |
|--------|----------|
| Get a user's heart rate | `POST /heart?action='get'` |
| Get a history of heart rate | `POST /heart?action='list'` |
| Link device with user | `POST /user?action='link'` |
| Get a user's measurement | `POST /measure?action='getmeas'&meastype=enum` |

When using this API, I had to rely on documentation to begin, as I was starting with no previous experience with this organization. Once I had enough experience with the API it was much easier to use and understand. If routes were redesigned to `GET /heart/current` and `GET /measure/temperature` people would be able to skip the initial learning curve. While there are no doubt benefits to their route organization, inter-api consistency has value and shouldn't be ignored.

{{% aside %}}
That pattern of `VERB /nouns/IDs/more-nouns` is a good rule of thumb, but won't fit every case. When you get a route that you're not sure what to do with just ask yourself, "What would I expect if I were using this API?" and you'll find a decent answer. I've seen certain actions, like checking a todo item, noun-ified via `PUT /todo/{todoID}/check` with a body of `true/false`.
{{% /aside %}}

## Discoverability

Discoverability is another principle that effects how easy it is for users to learn your interface. A `discoverable` interface is one that exposes what's possible to the user easily. This is separate from documentation, the goal is for the user to learn without outside help. This doesn't replace documentation either, having a knowledge base that supplements discoverability is another good principle to follow.

GraphQL's playground has it's schema and docs enabled by the API and query language. OpenAPI standards are a great way to communicate API endpoints as well. If we have those definitions already for documentation, why not include them under some routes for API users? Imagine you have a route on an api and you don't know what it returns. If the API was discoverable you could, without opening another Chrome tab, just hit `OPTIONS /api/v1/pets`.

```json
{
  "/pets": {
    "get": {
      "description": "Returns all pets from the system that the user has access to",
      "responses": {
        "200": {          
          "description": "A list of pets.",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/pet"
                }
  ...
}
```


OUTLINE:

Communication through API response mediums is key. Machine readability is achievable through standard formats.