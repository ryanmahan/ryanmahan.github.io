---
title: "Can copilot pass a coding interview?"
date: 2022-08-01T17:43:00-04:00
draft: true
---

[Github Copilot](https://github.com/features/copilot), if you haven't heard of it yet, is a natural language AI model built on [OpenAI Codex](https://openai.com/blog/openai-codex/) that focuses on the translation of natural language to code. Given that most technical coding interviews are basically translating a natural language prompt into some code, I wanted to test Copilot's ability to land a coding job.

Using [leetcode's most popular problems](https://leetcode.com/problemset/all/?sorting=W3sic29ydE9yZGVyIjoiREVTQ0VORElORyIsIm9yZGVyQnkiOiJGUkVRVUVOQ1kifV0%3D) I tested copilot's ability to solve problems given a short english description. I used a typescript, so I could read the results easily and so I could give typed hints to copilot if need be. Most questions are easily described in a line or two, and providing `function exampleName(` was enough for copilot to take it from there. You can see the results for individual questions in [this post's accompanying github repository](https://github.com/ryanmahan/copilot-interview).

This methodology worked reasonably well to avoid overfitting. In some cases copilot would suggest a comment with a link to the question, but it was still up in the air whether it's solution would be correct or not. When stuck, I would sometimes try to suggest different prompts for copilot to work off of. Usually it would suggest the same solution. In general, it seemed like copilot would either understand the functionality right away or it never would.

## It could probably get an internship

Copilot did reasonably well on Easy and Medium questions. When it came to leetcode's "hard" questions, copilot couldn't write a solution for any of the six I tried. Per question data and solutions can be seen on [github](https://github.com/ryanmahan/copilot-interview).

|                      | Total | Solved | Optimal | % solved | % optimal | % optimal of solved |
| -------------------- | ----- | ------ | ------- | -------- | --------- | ------------------- |
| Easy                 | 13    | 10     | 7       | 77%   | 54%    | 70%              |
| Medium               | 32    | 14     | 9       | 44%   | 28%    | 64%              |
| Overall (Excl. Hard) | 45    | 24     | 16      | 53%   | 36%    | 67%              |


From my experience interviewing and interviewing others, copilot would do reasonably well with most internship tech screens. It's performance with easy questions was surprising and likely attributable to how much easier it is to explain an easy question. Some infamous coding questions, for instance, FizzBuzz and Two Sum barely needed a comment. With graph questions, copilot would usually get the searching algorithm correct, using breadth first search when looking for a shortest path or depth first when examining all nodes. When working iteratively, copilot usually would track the wrong results from iterating in a graph, recursively copilot would be fine. In general, copilot handled recursion well, to the point that when I saw copilot suggest a helper function I would expect it to pass the tests.

There were a few instances where copilot could produce the bulk of the response to a question and I could fix a bug or change the output slightly to get it to pass. I'm not including these in it's solved count. There's another variation of this experiment where copilot isn't the only coder, but supplies helper functions. Copilot would do well on [Top K frequent elements](https://leetcode.com/problems/top-k-frequent-elements/) if instead of a large prompt for the whole question, I gave it prompts for counting occurrences in an array and then selecting the largest K keys from a map. Breaking problems down into sub-problems is an important part of software engineering, and one that copilot can't seem to do.

Copilot performed best with questions like [LRU Cache](https://leetcode.com/problems/lru-cache/) and [Insert GetRandom Delete O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/). I believe that these questions, where the interviewee has to design and write a class for the solution, are more representative of actual software engineering. Copilot seems to do better with these questions because the functionality is split into pieces. Copilot also seems to understand what the class is from a comment + class name and can fill in the rest, it suggested the old URL for the LRU cache problem in a comment while writing the results.

From these results, my only takeaway is that **Co**pilot is aptly named. Given one of these problems, I'd be able to solve it much faster with copilot than without, but it's clear that copilot is not capable of solving problems that include larger amounts of complexity on it's own *yet*. A future version may include some method of breaking down problems, but for now, today's copilot makes a good sidekick.

## My experience with Copilot

This was my first time using copilot, as most of my coding right now is for work, academics or learning Go. Copilot doesn't fit these use cases well, especially when academic honesty is on the line. When copilot doesn't produce correct code, it's great at producing correct-looking code. Look at this code from it's solution to [K closest points to origin](https://leetcode.com/problems/k-closest-points-to-origin/). Initially copilot was only supplied with the comment and function name.

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


Can you spot the problem? Nothings actually ever sorted, this function just returns the input array, but sliced. In another language, this could be fixed easily with an ordered map, but in javascript maps are ordered by insertion. This code, at a glance, does look like it works though. In my opinion, that's the dangerous side of copilot and it happened too often for me to want to use it in a real codebase.

Lastly, I'll leave you with copilot's (correct) solution to [counting odds.](https://leetcode.com/problems/count-odd-numbers-in-an-interval-range/)

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
