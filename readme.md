# Star Wars API Tutorial

The [tutorial file](./tutorial.md) tells you how to make use of the [Star Wars API](https://swapi.dev/).

Here are the live versions of [the extended page](https://danieloaks-docstest-starwars.netlify.app/) and [the tutorial page](https://danieloaks-docstest-starwars.netlify.app/test.html).

Below are the decisions I made while putting this together, as well as some commentary along the way.


## Decisions

- Styling
  - **Why so simple?** Since this is more of a technical writing task, I didn't want to go overboard on the design. Nice, simple, with small bits of colour to separate characters from planets. Keeping the html simple also makes it easier for those reading the tutorial to understand what's going on.
  - **Why Tailwind CSS?** I've been using Tailwind CSS lately for a few projects, and have been liking it! I decided to use it here as well, and explain some of the basics around how it's designed and how to make use of it. Writing it for the extended file `index.html` was a little painful because the intellisense in VS Code doesn't work when including it from the CDN, but it produced some simple, nice-looking results easily.
- Coding
  - **Why use `document.addEventListener` instead of onload?** It feels more appropriate to promote the use of event listeners rather than attributes is all. This is mostly personal preference, as either works fine, but it feels like we're setting the reader up for success by getting them into this habit early.
  - **Why use `document.createElement` instead of constructing a string for the `innerHTML`?** For mostly the same reasons as above. As well as being safer and less prone to injection attacks and the like – doing it this way shows readers that we care more about security than if we promoted the use of manually-generated strings.
  - **Why use `replaceChildren`?** I went back and forth on this a bit, but given [the caniuse data](https://caniuse.com/?search=replacechildren) on this function, decided it was worth using it. Promoting the modern way to do things is what I prefer doing, unless we're aiming for compatibility with a specific browser or device. In this case I could decide, and thought the level of support was fine.


## Commentary

The first thing I did was extend `index.html` and `main.js` to the point where I liked it. After this, I got to working on the actual tutorial.

The main question to ask is "What kind of tutorial do I want this to be?". This lets me put together a short list of references for how my tutorial should look and feel. Note, these don't need to be perfect – they just give us a rough reference of what to include, how to talk to the audience, etc.

Here are some references for this project:

- https://buildkite.com/docs/tutorials/pipeline-upgrade
- https://buildkite.com/docs/pipelines/secrets
- https://stateful.com/blog/discord-rest-api
- https://buildkite.com/blog/fixing-flaky-tests

After deciding on the type of tutorial, I decide on the best way to explain this process. I came up with this set of steps: **Basic HTML and Javascript**, **Grabbing the data**, **Waiting for the page to load**, **Updating the table**, and **Displaying our data**.

And then I just went through each step, writing up a simple initial version of the tutorial guided by the `index.html` and `main.js` I ended up with earlier.

After creating the initial version I added the table of contents to improve readability, then continued adding sections and editing the content. You can see this process play out in [the commit log](https://github.com/DanielOaks/docstest-starwars/commits/main)!

After finishing up the Styling section and passing the tutorial around for review I declared it finished.
