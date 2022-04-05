---
title: "How does React Concurrency improve performance?"
date: 2022-04-04T18:27:37-04:00
draft: true
---

When I first read about React's new concurrency feature, my first thought was "How do they do that? Isn't V8 single-threaded?" It's true, for the javascript side of V8 at least, that there's only one accessible thread per execution context. This means that any React concurrency happening is happening single-threaded. Luckily for us, multithreading on single processor systems has been observed thoroughly and shows increases in performance.

If you haven't read the [React team's writeup on their concurrency feature](https://17.reactjs.org/docs/concurrent-mode-intro.html), you can find it here. They explain how they implemented it far better than I ever could. 

## How does multithreading increase performance on a single-core CPU?

// TODO Snarky comment about single core/thread systems
In a computer with one execution context, multi-threading can be used to reduce blocking calls. Let's take a mix of threads on one execution context and look at how they run parallel and sequentially.

// TODO Illustration of Sequential I/O and CPU tasks.

The main problem with I/O calls in a single-threaded OS is that they were *blocking*, stopping execution of anything else that might be useful. Operating Systems solved this problem by allowing multiple simultaneous execution contexts on a single core, and swapping them out via the context swtich. This let them send a call out, do some CPU intensive work, then return to the original thread when the I/O call returns. Start interleaving I/O intensive and CPU intensive work and you've nearly doubled the work a processor can do.

# TODO: Illustration of concurrent mix of I/O and CPU intensive tasks.

The I/O intensive threads in an operating system are akin to the API calls your react app makes. The CPU intensive threads have become rendering calls. What if we started an API call, rendered the page except for the API data, then returned when the API call was over? This is how single-threaded systems increase performance, by reducing idle time.

## The interruption's goal

Operating Systems and React face incredibly similar problems here. They both have a set of tasks with different estimated runtimes, priorities, and I/O usage. A worst-case scenario is your CPU kicking off a blocking I/O call right as you click on a button. Your button press gets scheduled after the disk finally returns with data. With interruption, the CPU can stop executing whatever it's doing to process the button animation and your click. The difference can be massive to a user's perception of responsiveness. // TODO: Can it? Back yourself up with a cite, numbers, etc.

// Todo illustration showing effectiveness of an interruption

Before rendering calls were interruptible, we'd have something like:

// Illustration of API call fetching and rendering sequentially and then interruptible

And now React can write to it's memory buffer before writing to the DOM, creating something like:


## In Conclusion

Similar to how Operating Systems used multithreading on single processor systems to remove the effects of blocking I/O calls, the React team has used increased concurrency to reduce the effect of blocking rendering calls, resulting in faster execution and a better user experience. There's only one downside, added code complexity! 


Thanks for reading, and if you liked this post, you might want to read my... oh this is my first blog post. Well, come back soon I guess!