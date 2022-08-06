---
title: "Can Copilot pass a coding interview?"
date: 2022-08-01T17:43:00-04:00
draft: false
image: copilot-interview.png
---
<meta property="og:image" content="copilot-interview.png" />

![Copilot interviewing for a job (credit: undraw.co)](copilot-interview.png)

[Github Copilot](https://github.com/features/Copilot) is a natural language model built on [OpenAI Codex](https://openai.com/blog/openai-codex/) that suggests code snippets based on existing comments and code. With Copilot, programmers write descriptive comments and function names and Copilot writes the rest. This is hilariously similar to the usual coding interview, which consists of a prompt and a template for a human to fill in with code. What if we replaced the human interviewee with Copilot? Would it generate good enough code to get a job?

Copilot has an advantage going into these challenges that it might not have elsewhere. I'm using [leetcode's most popular problems](https://leetcode.com/problemset/all/?sorting=W3sic29ydE9yZGVyIjoiREVTQ0VORElORyIsIm9yZGVyQnkiOiJGUkVRVUVOQ1kifV0%3D) as a testing base, and solutions to these questions are represented well on Github and therefore are likely in Copilot's training data verbatim. This was evident in testing, Copilot would sometimes suggest the URL to a question after I wrote a paraphrased version of the prompt. Even with this advantage I'd consider these results valid, as companies will sometimes ask these questions verbatim and interviewees recognize them as well. I implemented a few measures to avoid directly matching a questions prompt, by paraphrasing and avoiding using the exact problem title or function name.

## It could probably get an internship!

Copilot did reasonably well on Easy and Medium questions. When it came to leetcode's "hard" questions, Copilot couldn't write a solution for any of the six I tried. Per question data and solutions can be seen on [github](https://github.com/ryanmahan/Copilot-interview). I might be an easy interviewer, but I would advance a candidate for most of Copilot's responses.

|                      | Total | Solved | Optimal | % solved | % optimal | % optimal of solved |
| -------------------- | ----- | ------ | ------- | -------- | --------- | ------------------- |
| Easy                 | 13    | 10     | 7       | 77%   | 54%    | 70%              |
| Medium               | 32    | 14     | 9       | 44%   | 28%    | 64%              |
| Overall (Excl. Hard) | 45    | 24     | 16      | 53%   | 36%    | 67%              |

From my experience interviewing and interviewing others, Copilot would do reasonably well with most internship tech screens. It's performance with easy questions was surprising and likely attributable to how much easier it is to explain an easy question. Some infamous coding questions, for instance, FizzBuzz and Two Sum barely needed a comment. With graph based questions, Copilot would usually get the searching algorithm correct, using breadth first search when looking for a shortest path or depth first when examining all nodes. Copilot was more successful when working recursively than iteratively,  to the point that when I saw Copilot suggest a helper function I could expect it to pass the tests.

There were a few instances where Copilot could produce the bulk of the response to a question and I could fix a bug or change the output slightly to get it to pass. I'm not including these in it's solved count. There's another variation of this experiment where Copilot isn't the only coder, but supplies helper functions. Copilot would do well on [Top K frequent elements](https://leetcode.com/problems/top-k-frequent-elements/) if instead of a large prompt for the whole question, I gave it prompts for counting occurrences in an array and then selecting the largest K keys from a map. Breaking problems down into sub-problems is an important part of software engineering, and one that Copilot can't seem to do (*yet*).

Copilot performed best with questions like [LRU Cache](https://leetcode.com/problems/lru-cache/) and [Insert GetRandom Delete O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/). I believe that these questions, where the interviewee has to design and write a class for the solution, are more representative of actual software engineering. Copilot seems to do better with these questions because the functionality is split into pieces and is more easily described. Copilot also seems to understand what the class is from a comment + class name and can fill in the rest. This might be an indicator of the testing data fitting our use case well, Copilot suggested an outdated URL for the LRU Cache problem.

From these results, my only takeaway is that **Co**pilot is aptly named. Given one of these problems, I'd be able to solve it much faster with Copilot than without, but it's clear that Copilot is not capable of solving problems that include larger amounts of complexity on it's own. A future version may include some method of breaking down problems, but for now, today's Copilot makes a good sidekick. To be fair, that is exactly what it was designed to do and it does it well.

## My experience with Copilot

This was my first time using Copilot, as most of my coding right now is for work, academics or learning Go. Copilot doesn't fit these use cases well, especially when academic honesty is on the line. 

When Copilot doesn't produce correct code, it's great at producing correct-looking code. Look at this code from it's solution to [K closest points to origin](https://leetcode.com/problems/k-closest-points-to-origin/). Initially Copilot was only supplied with the comment and function name.

```typescript
// given a list of points on a euclidean plane, find the k closest points to the origin
function kClosest(points: number[][], k: number): number[][] {
  const result: number[][] = [];
  const map = new Map<number, number[]>();
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const distance = Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2));
    if (map.has(distance)) {
      map.set(distance, [...map.get(distance), i]);
    } else {
      map.set(distance, [i]);
    }
  }
  for (const [distance, indexes] of map) {
    result.push(...indexes.map(index => points[index]));
  }
  return result.slice(0, k);
}
```

Can you spot the problem? Nothings actually ever sorted, this function just returns the input array, but sliced. In another language, this could be fixed easily with an ordered map, but in javascript maps are ordered by insertion. This code, at a glance, does look like it works though. Like Tesla's autopilot, this isn't a hands-off solution, programmers using Copilot should still expect to understand what they're contributing. My rule of thumb for copy/pasting stackoverflow answers applies well here: if you can't describe the code, you can't use the code.

Lastly, I'll leave you with Copilot's solution to [counting odds](https://leetcode.com/problems/count-odd-numbers-in-an-interval-range) between two numbers. 

```typescript
// return the number of odd numbers between [low, high] 
function oddCount(low: number, high: number): number {
  let count = 0;
  for (let i = low; i <= high; i++) {
    if (i % 2 !== 0) {
      count++;
    }
  }
  return count;
}
```
