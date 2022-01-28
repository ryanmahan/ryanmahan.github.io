---
title: "BallotDropMA" # Title of your project
date: 2022-01-28T17:29:15-05:00
weight: 0 # Order in which to show this project on the home page
external_link: "" # Optional external link instead of modal
resources:
    - src: plant.jpg
      params:
          weight: -100 # Optional weighting for a specific image in this project folder
draft: false
---
{{% center %}} 
[API Github](https://github.com/ryanmahan/ballotdropma-api)

[Github](https://github.com/ryanmahan/ballotdropma)
{{% /center %}}
A website built to help MA residents find their closest ballot drop box. I scraped the Secretary of State's website to get the data, then hosted it in a MongoDB Atlas instance. The backend is something I'm particularly proud of, generic controllers and services work by dependency inversion of the Mongoose Models. The API and Webapp were hosted on Azure from September to December 2020.