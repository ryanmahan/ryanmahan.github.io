---
title: "There's an RFC for that!"
date: 2022-08-07T00:19:44-04:00
draft: true
---

RFCs form the [basis](https://www.rfc-editor.org/rfc/rfc791.html) of [the internet](https://www.rfc-editor.org/rfc/rfc2616.html) and have been around for more than [50 years](https://datatracker.ietf.org/doc/html/rfc20). Here's some of the RFCs I've found over the past few years, that I often look back at for ideas. I'll try to keep this list up to date as I find more that I like!

## Problem Details for HTTP APIs, RFC 7807

*Authors: Mark Nottingham, Erik Wilde*

This RFC details a proposed standard for error messages from APIs. It follows user-centric design principles, particularly perceptibility, allowing the user to easily understand the state of the system. A normal `400 Bad Request` response let's you know that your request was malformed, but RFC7807 proposes the following response body:

```json
   {
   "type": "https://example.net/validation-error", // a link to the error description
   "title": "Your request parameters didn't validate.", // a human readable short-description
   "invalid-params": [ { // specific to 400s
                         "name": "age",
                         "reason": "must be a positive integer"
                       },
                       {
                         "name": "color",
                         "reason": "must be 'green', 'red' or 'blue'"}
                     ]
   }
```

This response is a great deal better than a blank `400`, letting the user know exactly how to recover from such an error. This isn't easy to implement, so I usually find some step between no body and this ideal body both practicable and percievable.

Also in this RFC are five fields they propose:

1. type: a link to an error descriptor
2. title: a short one-liner about the error type
3. status: copy of the HTTP status returned
4. detail: explanation of this specific error, human-readable and focused on allowing the user to recover from the error rather than debug it
5. instance: a URI with more information about this specific error

With internal APIs, I will usually add a shortened stacktrace to allow myself and other fullstack devs on my team to more easily debug the issue.