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

# Babel

## Why Babel Is Needed

Imagine you're targeting both modern browsers and Internet Explorer (which doesn't support ES6 or modern features)

### Without Babel

```html
<script>
  const greet = (name) => `Hello, ${name}`;
  console.log(greet("Alice"));
</script>
```

- Modern browsers: It will run just fine.
- IE 11: Throws an error because it doesn’t recognize arrow functions.

### With Babel (After Transpilation)

```html
<script>
  var greet = function greet(name) {
    return "Hello, " + name;
  };
  console.log(greet("Alice"));
</script>
```

- Modern browsers: It still works perfectly (Babel just ensures compatibility).
- IE 11: It runs without errors because Babel has converted the arrow function into a regular function.

## What Is Babel

Babel is a JavaScript compiler (transpiler) that allows developers to write modern JavaScript (ES6+ or newer) and convert it into older versions (like ES5) so that it can run in environments (like older browsers or Node.js versions) that don’t yet support the latest features.

Think of Babel as a translator that takes your "new language" (modern JavaScript) and converts it into an "old language" (JavaScript that all browsers understand).


## Installation

1. Install Babel

    ```bash
    npm init -y
    npm install --save-dev @babel/core @babel/cli @babel/preset-env
    ```

2. Create Babel config file (`babel.config.json`)

    ```json
    {
      "presets": ["@babel/preset-env"]
    }
    ```

3. Run Babel

    ```bash
    npx babel js/src --out-dir js/dist
    ```

This compiles all files from `src/` to `dist/`.

## Babel Presets & Plugins

- Presets = groups of plugins.
  - `@babel/preset-env – Transpile ES6+`
  - `@babel/preset-react – For JSX (React)`
  - `@babel/preset-typescript – For TypeScript`
- Plugins = individual transformations.
  - `@babel/plugin-proposal-optional-chaining`
  - `@babel/plugin-transform-arrow-functions`


## How Babel Works

When you run Babel on a file, it goes through three main phases:

1. Parsing (Code → AST)
2. Transforming (AST → Modified AST)
3. Code Generation (Modified AST → Code)

This pipeline is very similar to how compilers work, but Babel is a transpiler (source-to-source compiler).

### 1. Parsing (Code → AST)

Parsing happens in two sub-steps:

#### 1. Lexical Analysis (Tokenization)

The input JavaScript code is split into tokens (smallest units like `const`, `=`, `(`, `)`, `{`, `}`).

```js
const firstName = "Masum";
const lastName = "Billah";
```

Tokens might look like:

```js
[
  { type: "Keyword", value: "const" },
  { type: "Identifier", value: "firstName" },
  { type: "Punctuator", value: "=" },
  { type: "String", value: "Masum" },
  { type: "Punctuator", value: ";" },
  { type: "Keyword", value: "const" },
  { type: "Identifier", value: "lastName" },
  { type: "Punctuator", value: "=" },
  { type: "String", value: "Billah" },
  { type: "Punctuator", value: ";" }
]
```
#### 2. Syntactic Analysis

Next, Babel transforms these tokens into an Abstract Syntax Tree (AST). The AST is a tree structure that represents the syntax of the code.

For the two variable declarations:

```json
{
  "type": "VariableDeclaration",
  "kind": "const",
  "declarations": [
    {
      "type": "VariableDeclarator",
      "id": { "type": "Identifier", "name": "firstName" },
      "init": { "type": "Literal", "value": "Masum" }
    },
    {
      "type": "VariableDeclarator",
      "id": { "type": "Identifier", "name": "lastName" },
      "init": { "type": "Literal", "value": "Billah" }
    }
  ]
}
```

Babel uses `@babel/parser` to do this job.

### 2. Transforming (AST → Modified AST)
Now, Babel applies transformations based on the plugins and presets you have in your configuration. However, since there’s no modern syntax to transform in this simple example, we’re essentially working with no-op transformations.

#### Example Transformation

If there were transformations (like changing `const` to `var`, or converting arrow functions), Babel would modify the AST. For this case, no such transformation is needed, so the AST remains the same.

For example, if you had a transformation to convert `const` to `var`, Babel would modify the AST as follows:

Original AST (simplified):
```json

{
  "type": "VariableDeclaration",
  "kind": "const",  // To be transformed to 'var'
  "declarations": [ ... ]
}
```

Transformed AST:
```json
{
  "type": "VariableDeclaration",
  "kind": "var",  // After transformation from 'const' to 'var'
  "declarations": [ ... ]
}
```

**Used Tool**

- This is where `@babel/traverse` and plugins work:
- `@babel/plugin-transform-arrow-functions` sees `ArrowFunctionExpression` nodes.
- Rewrites them as `FunctionExpression` nodes.

### 3. Code Generation (Modified AST → Code)

Finally, after Babel processes the AST and applies the necessary transformations, it generates the final JavaScript code.

If there were no transformations, the output would look like this:

```js
const firstName = "Masum";
const lastName = "Billah";
```

If Babel had transformed the `const` declarations into `var`, the generated code would look like this:

```js
"use strict";

var firstName = "Masum";
var lastName = "Billah";
```

- `"use strict"` is added automatically by Babel for better error handling.
- `const` is converted to `var`, which is supported by older browsers like Internet Explorer 11.

**Used Tool**
- `@babel/traverse` → Walks through AST nodes
- `@babel/types` → Helpers for building/modifying AST nodes
- `@babel/generator` → Turns AST back into code
- `@babel/core` → Orchestrates everything
