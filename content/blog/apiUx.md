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

## It's all communication

A traditional user interface has many different methods of communicating with it's user. My iPhone has a screen, speaker, vibrator, physical switches, and a camera flash that all get used for the notification system. With so many modalities to communicate through, it's no wonder the user experience is robust and intuitive. APIs have a lack of communication methods, relying mostly on structured text that needs to be both machine and human readable. When faced with this constraint, how can we create robust user experiences with our limited communication ability?

I recently took Georgia Tech's Human Computer Interaction (HCI) course taught by Professor David Joyner. During the course we discuss many different design heuristics that apply well to the user interface of applications. If we start thinking of API endpoints and messages as a user interface we can improve the usability for our consumers whether they be developers, researchers, or even our future selves. Let's look at a few design heuristics and how they can be applied to backend web development.

{{% aside %}}
If you're looking to learn more about HCI you can check out the [course website](https://omscs6750.gatech.edu/), and view the public course videos [here](https://omscs.gatech.edu/cs-6750-human-computer-interaction-course-videos). If you wan't to know more about the Online Masters in Computer Science (OMSCS) program, reach out on linkedIn! I've had a wonderful experience and would love to share.
{{% /aside %}}

## Visibility

Visibility, also known as perceptibility, is the ability for your user to understand the state of the system. HTTP has defined [status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) for a system state shorthand already. When an API returns a 4xx or 5xx error code our user has one goal -- figure out what the error is and how to fix it. A blank 400 response could mean many things when returned without a message, leaving our user stranded.

When it comes to errors, [RFC 7807 "Problem Details for HTTP APIs"](https://datatracker.ietf.org/doc/html/rfc7807) details a fantastic method for exposing system state:

```json
HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
Content-Language: en

{
  "type": "https://example.com/probs/out-of-credit",
  "title": "You do not have enough credit.",
  "detail": "Your current balance is 30, but that costs 50.",
  "instance": "/account/12345/msgs/abc",
  "balance": 30,
  "accounts": ["/account/12345",
                "/account/67890"]
}
```

The level of detail here is what gives the user the ability to see into the system. It's clear what went wrong and what needs to be done to fix it. Recently I hit an API that I was in the process of learning, Azure Blob Storage, and received a blank `409: Conflict` as a response. Azure has [44 errors](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes) that resolve to `409 Conflict`, so how was I supposed to know what the source was?

We can scrap quite a bit from this RFC's example and still achieve better usability than Azure here. A simple title with the error code would at least give me something to search for online and a description might help me avoid having to search altogether. When meeting the proposed RFC at it's minimum, the `type` hyperlink, a `title`, and the HTTP status code, we create better system clarity for our user.

{{% aside %}}
Another bonus for detailed error messages is enabling your frontend to provide more visibility for the end user. Your frontend displaying a backend fed error message of "Your current balance is 30, but that costs 50." is leagues better over a vague "An error occured. Please try again later."
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

Discoverability is another principle that effects how easy it is for users to learn and find the features of your interface. A discoverable interface is one that exposes what's possible to the user easily. In a Web UI, a good example is keyboard shortcut hints or descriptive tooltips on icons. Unlike documentation, the goal is for the user to learn without reference material. This doesn't replace documentation, having a knowledge base that supplements discoverability is another good principle to follow.

The Hypermedia As The Engine Of Application State (HATEOS) constraint part of REST handles discoverability well. In requests HATEOS dictates including links to other endpoints related to a resource. When requesting `GET /account/12345` the application responds with links to other resources that the user can request. The user has to do little to no work to discover how to find the deposit history of an acocunt. If the tool is internally consistent this also allows the user to infer other routes like creating a deposit or withdrawl. 


```json
{
    "account": {
        "account_number": 12345,
        "balance": {
            "currency": "usd",
            "value": 100.00
        },
        "links": {
            "deposits": "/accounts/12345/deposits",
            "withdrawals": "/accounts/12345/withdrawals",
            "transfers": "/accounts/12345/transfers",
            "close-requests": "/accounts/12345/close-requests"
        }
    }
}
```

After seeing this response, it's simple to find the related resources. No guesswork on how to find more information regarding the account. The routes are also prepopulated with the correct IDs, making machine readability easier. A system navigating your API can do so more consistently with server supplied links.

The OpenAPI standard provides an externally consistent method of documenting APIs. Documentation isn't discoverability, but there are ways we can incorporate the OpenAPI information into our API to increase discoverability. One option would be to introduce routes to get the relavent OpenAPI information. Something like an `OPTIONS /pets` call could return the OpenAPI information regarding pets:

```json
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
  ...
```

With these methods developers could receive information about your API without leaving their current tools and train of thought. This is what discoverability is about, allowing users to learn your interface in their current setting without having to context switch out of their current task.