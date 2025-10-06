# HTML Parsing

HTML parsing is the process by which the browser reads your raw HTML text (.html file) and converts it into a structured, in-memory representation called the DOM (Document Object Model).

## 1. HTML Source Code Arrives

When you open a webpage, the browser downloads the HTML file from the server.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>Welcome to HTML parsing!</p>
  </body>
</html>
```

This is plain text — not yet structured or rendered.

## 2. Tokenization

The browser’s HTML parser starts reading this text character by character.

It breaks it into tokens — each representing an HTML construct:

- Start tags (`<html>`, `<body>`)
- End tags (`</body>`)
- Text nodes (`Hello, Welcome...`)
- Comments, attributes, etc.

```html
< !DOCTYPE html >
< html >
< head >
< title >
My Page
</ title >
< body >
< h1 >
Hello
</ h1 >
...
```

## 3. DOM Tree Construction

As the tokens are recognized, the browser creates nodes and connects them hierarchically to build the DOM tree.

```html
Document └── html ├── head │ └── title ("My Page") └── body ├── h1 ("Hello") └──
p ("Welcome to HTML parsing!")
```

- A tree structure representing all elements and their relationships.
- JavaScript and CSS interact with this tree.

# Script Handling

## Normal `<script>`

```html
<script src="normal.js"></script>
```

The parser pauses:

- Fetches and executes `normal.js`
- Only then continues parsing HTML below

This is why `<script>` tags often go at the end of `<body>` — to avoid blocking HTML parsing.

## `<script defer>`

```html
<script src="defer.js" defer></script>
```

- Parser continues parsing HTML (non-blocking)
- Script is executed after HTML parsing is complete

## `<script async>`

```html
<script src="main.js" async></script>
```

- Script is downloaded in parallel
- Executes as soon as it’s ready
- Might execute before or after parsing finishes

# Data Sharing

When you include multiple scripts using `<script>` tags without `type="module"`,
all of them run in the same global scope (the `window` object in browsers).

```html
<script src="./js/src/declare.js"></script>
<script src="./js/src/index.js"></script>
```

Scripts are executed in the order they appear in the HTML (unless using `async` or `defer`).

Multiple file share data which are in the same global scope, but the run independently.

## When Scripts Do NOT Share Data

If you use the module system (i.e., `<script type="module">`),
each file runs in its own module scope, not the global scope.

```html
<script type="module" src="./js/src/declare.js"></script>
<script type="module" src="./js/src/index.js"></script>
```

- When we want to use `import`/`export` we have to use `type="module"`
