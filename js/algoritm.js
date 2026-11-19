// Лаб 9.2: js/algorithms.js (бэлэн функц ашиглахгүй)

function sumTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

function factorial(n) {
  if (n < 0) return null;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function fizzBuzz(n) {
  const output = [];
  let idx = 0;
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      output[idx] = "FizzBuzz";
    } else if (i % 3 === 0) {
      output[idx] = "Fizz";
    } else if (i % 5 === 0) {
      output[idx] = "Buzz";
    } else {
      output[idx] = i;
    }
    idx++;
  }
  return output;
}

function countVowels(str) {
  const vowels = "aeiouyAEIOUYаэиоуөүеёыАЭИОУӨҮЕЁЫ";
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    for (let j = 0; j < vowels.length; j++) {
      if (ch === vowels[j]) {
        count++;
        break;
      }
    }
  }
  return count;
}

function isPalindrome(str) {
  const chars = [];
  let len = 0;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch !== " " && ch !== "\t" && ch !== "\n") {
      chars[len] = ch.toLowerCase();
      len++;
    }
  }

  let left = 0;
  let right = len - 1;
  while (left < right) {
    if (chars[left] !== chars[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

function maxOf(arr) {
  if (!arr || arr.length === 0) return null;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

function digitSum(n) {
  let num = n < 0 ? -n : n;
  let sum = 0;
  while (num > 0) {
    const digit = num % 10;
    sum += digit;
    num = (num - digit) / 10;
  }
  return sum;
}