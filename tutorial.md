# Using the Star Wars API

There are many ways to get information about Star Wars, but the simplest is with the [Star Wars API (swapi.dev)](https://swapi.dev/). This API collects information about the films, characters, and planets throughout the series.

In this tutorial we'll show you how to pull data from this API and display it in a table:

- [Step 1: Basic HTML and Javascript](#step-1-basic-html-and-javascript)
- [Step 2: Grabbing the data](#step-2-grabbing-the-data)
- [Step 3. Waiting for the page to load](#step-3-waiting-for-the-page-to-load)
- [Step 4: Updating the table](#step-4-updating-the-table)
- [Step 5: Displaying our data](#step-5-displaying-our-data)


## Step 1: Basic HTML and Javascript

Let's start by creating some basic HTML. We've included a script tag to include our JS and a table for our data:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Star Wars database</title>
    <meta charset="UTF-8" />

    <!-- javascript -->
    <script></script>
  </head>
  <body>
    <h1>Star Wars database</h1>

    <!-- characters table -->
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Birth year</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </body>
</html>
```


## Step 2: Grabbing the data

The Star Wars API makes many types of data available: films, people, planets, species, starships, and vehicles. You can see specifics on each of these endpoints on [the API documentation here](https://swapi.dev/documentation#wookiee).

For this tutorial, we'll display characters from the series. Looking at the API documentation, this is done with the [People endpoint](https://swapi.dev/documentation#people).

Let's start writing some Javascript:

```js
let url = "https://swapi.dev/api/people/?page=1";

// get the url
let response = await fetch(url);

// get the json data from the response
const data = await response.json();

console.log(data);
```

Using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) makes it easy to call external APIs. If we include this in our `<script>` tag and reload the page, we can see the data appear in our console:

![People data shown in the browser's console](tutorial/console-screenshot-1.png)


## Step 3. Waiting for the page to load

Trying to display data before the page has loaded can fail, so let's wait for the page to load before we make our API call.

First, let's put all of this inside a function:

```js
async function fetchCharacters() {
  let url = "https://swapi.dev/api/people/?page=1";

  let response = await fetch(url);
  const data = await response.json();

  console.log(data)
}
```

> 📘 Note: We need to make this an `async` function since we're using the [`await` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).

Now that this is a function, we can use the [`DOMContentLoaded` event](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event) to call it! Let's add this script underneath the above:

```js
document.addEventListener("DOMContentLoaded", fetchCharacters);
```

This will call the `fetchCharacters` function once the page has loaded and is ready. You should see the same data appear in the console after reloading the page.

At this point, here's what our HTML and code looks like:

```html

<!DOCTYPE html>
<html>
  <head>
    <title>Star Wars database</title>
    <meta charset="UTF-8" />

    <!-- javascript -->
    <script>
      async function fetchCharacters() {
        // get data
        let url = "https://swapi.dev/api/people/?page=1";
        let response = await fetch(url);
        const data = await response.json();

        // display data
        console.log(data)
      }

      document.addEventListener("DOMContentLoaded", fetchCharacters);
    </script>
  </head>
  <body>
    <h1>Star Wars database</h1>

    <!-- characters table -->
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Birth year</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </body>
</html>
```


## Step 4: Updating the table

Now we'll display the data which we grabbed! We want the data to appear in the table, and the script needs a way to insert data into the `tbody` tag. Let's make that simpler by giving this tag an ID:

```html
<tbody id="data"></tbody>
```

With this ID, we're able to insert data into this tag. Let's add this to our `fetchCharacters` function, just underneath our `console.log` call:

```js
document.getElementById("data").innerHTML = "<tr><td>Alice</td><td>52BBY</td></tr>"
```

This should add one row with the name "Alice" and the birth year "52BBY" to our table.

You should now see the new data appear:

![Star Wars page with the new data for Alice](tutorial/webpage-1.png)


## Step 5: Displaying our data

Now we can display things in the table. But to display the data we grabbed from the API, we need to add some more code.

Here's a simple snippet we can add to the end of our `fetchCharacters` function:

```js
data.results.forEach(character => {
  console.log(character);
});
```

This loops through each character from the result and prints it out. You can use this to see which attributes you want to display in your table.

Now instead of just printing the characters, let's create a row for each one:

```js
let rows = [];
data.results.forEach(character => {
  // create the new row
  let row = document.createElement("tr");

  // add the name and birth year columns
  let name = document.createElement("td");
  name.textContent = character.name;
  row.appendChild(name);

  let year = document.createElement("td");
  year.textContent = character.birth_year;
  row.appendChild(year);

  // add to our rows
  rows.push(row)
});
```

> 📘 Note: We're creating the elements this way, instead of making a string like we did for Alice, because this is safer if the API returns bad data. Take a look at the [`textContent` attribute](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) for more details.

Now that we have a list of rows, let's add them to our table with the [`replaceChildren` method](https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren):

```js
document.getElementById("data").replaceChildren(...rows);
```

---

With all the above changes, here's our final `fetchCharacters` function:

```js
async function fetchCharacters() {
  // get data
  let url = "https://swapi.dev/api/people/?page=1";
  let response = await fetch(url);
  const data = await response.json();

  // make rows
  let rows = [];
  data.results.forEach(character => {
    // create the new row
    let row = document.createElement("tr");

    // add the name and birth year columns
    let name = document.createElement("td");
    name.textContent = character.name;
    row.appendChild(name);

    let year = document.createElement("td");
    year.textContent = character.birth_year;
    row.appendChild(year);

    // add to our rows
    rows.push(row)
  });

  // display data
  document.getElementById("data").replaceChildren(...rows);
}
```

And here's what the page looks like:

![Table showing all the character entries](tutorial/webpage-2.png)


## Expanding on this

We're now finished, you've got your page grabbing data from the Star Wars API and displaying it! But there are many ways to extend this sample page.

You can:

- Use CSS to improve the page's style.
- Put the Javscript into a separate file to make it easier to read.
- Add next and previous buttons, which change the page being displayed.
- Add buttons to grab the characters, planets, and other data from the API.
- Show a 'loading' spinner while the data is fetched.

We've got an extended example including the above features:

- HTML: [`index.html`](./index.html)
- Javascript: [`main.js`](./main.js)

The code is more complex, but uses the above as a base. And this extended page looks like this:

![Extended page with styling, characters and planets button, and pagination](tutorial/extended-1.png)
