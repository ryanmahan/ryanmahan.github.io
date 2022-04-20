---
title: "How does React Concurrency improve performance?"
date: 2022-04-04T18:27:37-04:00
draft: false
tags: ["react"]
---

The React team has implemented concurrency on a single threaded V8 execution context. How does increased concurrency help when you only have one thread? Let's take a look at how Operating Systems developers were able to increase the performance of their hardware through the CPU scheduler.

First, if you haven't read the [React team's writeup on their concurrency feature](https://17.Reactjs.org/docs/concurrent-mode-intro.html), or [their more recent React v18 updates](https://reactjs.org/blog/2022/03/29/react-v18.html#what-is-concurrent-react) you should. They explain how they implemented it and how to use it.

## How does multithreading increase performance on a single-core CPU?

Operating systems have long used schedulers to more fairly allocate resources to the processes running within them. In a computer with one processor and execution context, multi-threading can be used to reduce blocking calls. For example, if we have a few threads running at once, and one makes an I/O call:

<img alt="An I/O blocking call" width="66%" src="blocking.png">

In our blocking example, P<sub>1</sub> holds onto the CPU while the disk is fetching the data it needs. The computer is locked up. Nothing else can happen. If the user clicks, nothing. This is the fundamental problem with blocking calls, our CPU is sitting idle when it could be working.

This was fixed with scheduling processes. When a process made a request for I/O, it would be kicked off the CPU and placed in a waiting queue. This would allow the CPU to process some more data, refresh the user interface, or whatever it had ready to be run. Eventually, the I/O request returns, P<sub>1</sub> is scheduled again and continues its execution.

{{% aside %}}
Both cooperative scheduling and pre-emptive scheduling solved this particular issue. As its name suggests, cooperative scheduling required the process to *cooperate* and give up the CPU when it has no work to do. Pre-emptive scheduling improved on this by kicking the process out after a certain time or after an I/O bound call, like our above example.
{{% /aside %}}

The fundamental difference between our examples here is the CPU's utilization. A higher utilization in the non-blocking example means we can have a shorter runtime. The more we're utilizing the CPU the faster we can accomplish our tasks.

## React's Blocking Calls

In React v17 and before, rendering calls wereblocking, just like our I/O calls above. While React was rendering your component it could do nothing else. Again, just like I/O calls, a click or other activities were held up by the render. 

Let's first look at how replacing the blocking call with a concurrent one can increase performance. We'll focus on responsiveness later. Using an API call as an example, we'll show how pre-rendering a bit of the page can reduce overall wait times for your user.

<img alt="Rendering a skeleton on React 18 can be faster" src="api.png" width="66%">

Here we have our 3 tasks.
1. Load the page and fetch our data
2. Render a skeleton of the page
3. Render the data of the page

React 18 limits its idle time by rendering a skeleton into memory while waiting for the  data. React 17 has to wait until the API call is over to begin rendering the skeleton. This leads to a faster load time after the data has returned which in turn means your page will load faster overall.

{{% aside %}}
There are two other benefits with concurrently rendering this page.
1. React v18 can keep displaying a loading screen longer while rendering in memory, then switch to a fully loaded page.
2. Partially rendered pages can be interrupted when data is refreshed. Before, React would render your stale components, see the new data, then re-render your components.
{{% /aside %}}

## Increasing Responsiveness

Operating Systems and React face incredibly similar problems with responsiveness and blocking tasks. They both have a set of tasks with varying runtimes, priorities, and I/O usage. A worst-case scenario is your CPU kicking off a blocking I/O call right as you click on a button. Or in React, a blocking render starting as you click a button. Your button press seems to take ages while the background task holds the CPU hostage. With interruption, the CPU can be reprioritzed to process the button animation and your click.

<img alt="A click event can be handled sooner and increase responsiveness" src="click.png" width="66%">

Even though the overall rendering time is not decreased, the latency (measured as time from interaction to response) is decreased.

In React, this could be buffering re-renders on an input field change, or a search button responding while the results populate on screen. These rendering changes won't block each other and will render in order of priority, giving the user a better experience.

## In Conclusion

Similar to how Operating Systems used multithreading on single processor systems to remove the effects of blocking I/O calls, the React team has used increased concurrency to reduce the effect of blocking rendering calls, resulting in faster execution and a better user experience. There's only one downside, added code complexity! Hopefully for most of us, this can be abstracted away into routers and component libraries.

Thanks for reading, and if you liked this post, you might want to read my... oh this is my first blog post. Well, come back soon I guess!