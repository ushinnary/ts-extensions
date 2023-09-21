# TS extensials (TypeScript essential extensions)

🚀 A project built with TypeScript to provide more useful features.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Code Examples](#code-examples)

## Installation

To install this project, run `npm install ts-extensials --save-dev`

## Usage

To use this project, follow these steps:

1. Open your main file (e.g. `index.ts` or `main.ts`) to make it usable in a whole project
2. Import the module you want to use (e.g `import 'ts-extensials/array/array.rust';`)
 

## Code Examples

Here are some code examples to help you get started:
* Rust-like array methods
```javascript
// Import a module
import 'ts-extensials/array/array.rust';

const first = [].first();
const last = [].last();

const array = [1, 2, 3, 4, 5];
array.retain(num => num % 2 === 0); 
// array = [2, 4]
```

* C# LINQ-like array methods
```javascript
// Import a module
import 'ts-extensials/array/array.linq';

const array = [1, 2, 3, 4, 5];
array.sum(); // 15
```