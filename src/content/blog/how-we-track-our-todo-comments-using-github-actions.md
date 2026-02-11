---
title: "How we track our todo comments using GitHub Actions"
slug: "how-we-track-our-todo-comments-using-github-actions"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6530a824534b0af06e6acc21"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-01-26T14:57:34.452Z"
  lastUpdated: "2024-01-26T14:57:34.452Z"
  createdOn: "2023-10-19T03:53:08.442Z"
author: "michael-schuster"
category: "tech-startup"
tags:
  - "evergreen"
  - "python"
  - "tech-startup"
  - "tooling"
date: "2021-12-01T00:00:00.000Z"
readingTime: 3 Mins Read
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/2af25be4/6530a78fe4deb66a7ae8fc1a_post_its.jpg"
seo:
  title: "How we track our todo comments using GitHub Actions - ZenML Blog"
  description: "A programmatic means of ensuring #TODO comments made in code also end up in our Jira ticketing system."
  canonical: "https://www.zenml.io/blog/how-we-track-our-todo-comments-using-github-actions"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/97edcf76/6530a78fe4deb66a7ae8fc1a_post_its.jpg"
  ogTitle: "How we track our todo comments using GitHub Actions - ZenML Blog"
  ogDescription: "A programmatic means of ensuring #TODO comments made in code also end up in our Jira ticketing system."
---

**Last updated:** October 17, 2022.

If you’re a software developer, you’re probably familiar with the following scenario: You’re working on a new feature or trying to fix a bug, and while reading through some code existing code you notice that there’s a nicer way to write it, or maybe a potential edge case isn’t handled. But where to go from here? Write a todo comment and let your future self handle it of course!

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/7f9ee035/6530a7bdf971ce8d04e97f90_todo_meme.jpeg" alt="Problems for future me" />
</figure>

While this might not be the optimal solution, I still regularly use todo comments if the fix is too complicated to implement right away as I find it can get quite distracting to repeatedly switch to my browser and create an issue with a meaningful description.

## How to keep todo comments in sync with Jira issues

This however brings a problem with it: these todos are separated from our Jira board so we did not take them into account when planning our sprints. Keeping the comments in code in sync with our Jira issues manually would require a considerable amount of effort. We would have to periodically go over the entire codebase and create issues for new todos as well as delete issues and todos if their counterpart was removed. Instead, we looked at multiple GitHub integrations in the Jira marketplace but couldn’t find an existing solution with similar features, so we decided to implement a GitHub Action that helps us track todos automatically.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/d3fcd825/6530a7bc9dbffe60298b0b98_github_action.png" alt="TODO" />
</figure>

## GitHub Actions to the rescue

Each time something is pushed to the main branch, a GitHub workflow is triggered which simply calls a python script to do the heavy lifting. The script itself uses the following regular expression to find todo comments in our python files:

```bash
pattern = r"(^[ \t]*#) TODO ?\[(LOWEST|LOW|MEDIUM|HIGH|HIGHEST|[A-Z]*?-[0-9]*?)\]:(.*$\n(\1 {2}.*$\n)*)"
```

Don’t worry I won’t bore you with the details of how this expression works, but it essentially means that our todo comments have to conform to a certain syntax (a comment starting with a capital TODO followed by a priority in square brackets and a colon) in order for the script to detect them. Once all syntactically correct todos are found, they are processed as follows:

<ul><li><strong>Create issues for new todos:</strong> Each time new code gets merged into the main branch of our repository, our script detects all new todos and creates Jira issues with the specified priority and description. The created issues include a github link to the actual comment for more context and are tagged with a separate label so we can quickly find them later. Additionally, we modify the comments to include a reference to the created issue which is not only used to avoid creating duplicated issues but also comes in quite handy if you come across a comment and want to for example check if there’s already someone working on it. ```python # before # TODO [HIGH]: Do something very important her</li></ul>

<ul><li><strong>Delete todos for closed issues:</strong> Our codebase is evolving quite quickly at the moment and we closed some obsolete issues from time to time. To automatically keep the todo comments and issues in sync, the script also deletes todo comments when the corresponding issue was closed.</li><li><strong>Tag issues when a todo is deleted:</strong> Now there is just one case left to handle: what if a todo comment gets deleted and the corresponding issue is still open? We decided to handle this with caution and not close the issue automatically to guard against accidentally deleted comments. Instead, our script adds a separate label to these “orphan” issues so we can easily discuss whether they should actually be closed during our planning meetings.</li></ul>

If you’re interested in more details or having something similar in your projects, check out the [script](https://github.com/zenml-io/zenml/blob/f5e7f688e102db80d87a6d4ba4513fcff84a242d/scripts/update_todos.py) and the accompanying [GitHub workflow](https://github.com/zenml-io/zenml/blob/f5e7f688e102db80d87a6d4ba4513fcff84a242d/.github/workflows/update_todos.yml).

*Michael Schuster is a Machine Learning Engineer at ZenML.*