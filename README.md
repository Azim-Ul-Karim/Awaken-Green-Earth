### 1. 
### What is the difference between var, let, and const?

`var`:

`var` হলো পুরনো নিয়মে Variable Declare করার Keyword। সাধারণত `var` কেবল কোনো ব্লকের মধ্যেই সীমাবদ্ধ থাকে না। Globally Access করা যায়। 

একই Scope-এ `var`-কে একাধিকবার Redeclare করা যায়। `var`-এর Value চাইলে Update-ও করা যায়।

```
var x = 10;
var x = 20;
x = 30;
console.log(x);
```

`let`:

`let` Variable Declare করার আধুনিক পদ্ধতি। `let` কোনো ব্লকের ভেতর Declare করলে সাধারণত সেটা তার বাইরে কোথাও থেকে Access করা যায় না।

একই Block-এ `let`-কে Redeclare করা যায় না। তবে চাইলে `let`-এর Value Update করা যায়।

```
let y = 10;
y = 20;
console.log(y);
```

`const`:

`const`-ও নতুন পদ্ধতি। এটাও কোনো ব্লকের ভেতর Declare করলে সাধারণত সেখানেই সীমাবদ্ধ থাকে।

একই Block-এ `const`-কে Redeclare করা যায় না। আবার চাইলেও একবার Value Assign করার পর সেটা আর বদলানো যায় না। 
তবে যদি `const` দিয়ে কোনো Object বা Array তৈরি করা হয়, তাহলে তার ভেতরের Elements পরিবর্তন করা যায়।

```
const a = [1, 2, 3];
a.push(4);
console.log(a);
```

### 2.
### What is the difference between map(), forEach(), and filter()?

`map()`:

`map()` হচ্ছে একটা Array method, যেটা প্রত্যেক Element-এর ওপর কোনো Function Apply করে নতুন একটা Array তৈরি করে। তবে  Original Array অপরিবর্তিত থাকে।

`map()` কোনো Empty Element-এর জন্য Function Execute করে না।

```
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2);
console.log(doubled);
```

`forEach()`:

`forEach()` প্রতিটা Element-এর ওপর Function Execute করে কিন্তু নতুন Array Return করে না। সাধারণত `forEach()` Loop এর মতো করে ব্যবহার করা হয়।

```
let numbers = [1, 2, 3];
numbers.forEach(num => {
  console.log(num * 2);
});
```

`filter()`:

`filter()` সাধারণত Array-এর Element থেকে Certain Condition অনুযায়ী নতুন Array তৈরি করে।

```
let numbers = [1, 2, 3, 4, 5];
let evens = numbers.filter(num => num % 2 === 0);
console.log(evens);
```

### 3.
### What are arrow functions in ES6?

Arrow Function হলো জাভাস্ক্রিপ্টে Function লেখার ছোট, সহজ ও সুপরিচিত উপায়। 

Arrow Function লিখতে চাইলে প্রথমে Variable Keyword লিখতে হয়। তারপর Variable Name। আর তার পাশে `=` চিহ্ন। তারমানে শুরুর এই অংশটা Function Expression এর মতোই।

পরবর্তীতে 1<sup>st</sup> Bracket দিয়ে তার ভেতর Parameter লিখতে হয়। এরপর 2<sup>nd</sup> Bracket না দিয়ে লিখতে হয় `=>`। দেখতে Arrow-এর মতোই লাগে এটাকে। আর `return` না লিখে Just অপারেশনটা লিখলেই হয়ে যাবে।

```
let add = (a, b) => a + b;
console.log(add(5, 3));
```

আরেকটা Function হলো Multi Line Arrow Function। 

সাধারণত Arrow Function ছোট হলে এক লাইনে লেখা যায়। কিন্তু অনেকগুলো Statement লিখতে হলে Multi Line Arrow Function ব্যবহার করতে হয়।
ঐ একাধিক Statement / Line লিখতে হয় Arrow-এর ডানদিকে 2<sup>nd</sup> ব্র্যাকেটের ভেতরে। 

আরেকটা ব্যাপার হলো – Multi Line Arrow ফাংশনের ক্ষেত্রে `return` লিখতে হবে যদি কোনো Operation থেকে থাকে তাতে।

```
const doMath = (a, b) => {
    const makeDouble = a * 2;
    const againDouble = b * 2;
    const result = makeDouble + againDouble;
    return result;
};
console.log(doMath(5,7));
```

তিনভাবে Arrow Function লেখা হয়।

- Parenthesis-এর ভেতরে কোনো Parameter থাকে না।
- Parenthesis-এর ভেতরে একটা Parameter থাকে। এক্ষেত্রে Parenthesis লেখা হয় না সাধারণত।
- Parenthesis-এর ভেতরে একাধিক Parameter থাকে।

### 4.
### How does destructuring assignment work in ES6?

জাভাস্ক্রিপ্টে Destructuring Assignment হলো একটা Feature, যেটা দিয়ে Array বা Object-এর Value-গুলোকে আলাদা Variable-এ খুব সহজে Extract করা যায়। ফলে Code অনেক Cleaner ও কম Repetitive হয়।

Object Destructuring লেখার একটা পদ্ধতি হলোঃ

```
const device = {name: "Phone", brand: "Vivo", price = 55000};
const {brand} = device;
```

অ্যারের ক্ষেত্রেও Destructuring Apply করা যায়।

```
const marks = [88, 99];
const [english, math] = marks;
```

### 5.
### Explain template literals in ES6. How are they different from string concatenation?

Multiple Lines লিখতে চাইলে সেটা Normally String দিয়েও লেখা যায়। কিন্তু String Concatenation পদ্ধতিতে সেটা করা হবে সময়সাপেক্ষ ব্যাপার।

```
const poem = "Twinkle Twinkle Little Star \n" +
    "How I Wonder What You Are! \n" +
    "Up Above The World So High \n" +
    "Like A Diamond In The Sky.";
console.log(poem);
```

বেশি বেশি না লিখে অল্প একটু লিখেই কাজটা করা সম্ভব। সেজন্য কেবল Multiple Lines লিখতে হবে দুইটা ব্যাকটিকের ( \` \` ) মাঝে।

```
const poem = `Twinkle Twinkel Little Star
How I Wonder What You Are!
Up Above The World So High
Like A Diamond In The Sky.`;
console.log(poem);
```

এই Backtick দিয়ে যে String লেখা হয়, ঐটাকে বলে Template Literal বা Template String।

এই স্ট্রিংয়ের ভেতরে কোনো ভেরিয়েবলের Value দেখাতে চাইলে একটা Dollar Symbol ( $ ) লিখতে হয়, তারপর 2<sup>nd</sup> Bracket। তাহলে স্ট্রিংটা Dynamic হবে।

এই 2<sup>nd</sup> ব্র্যাকেটের ভেতরে চাইলে যেকোনো Arithmetic operation লেখা যায়।

```
const price = 50;
const discountPrice = `Discounted price after 20% discount is : ${price * 0.8}`;
console.log(discountPrice);
```
