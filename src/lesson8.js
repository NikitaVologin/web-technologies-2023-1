// 1 задание
console.log("1 задание")
const students = [
    { name: 'Павел', age: 20 },
    { name: 'Иван', age: 20 },
    { name: 'Эдем', age: 20 },
    { name: 'Денис', age: 20 },
    { name: 'Виктория', age: 20 },
    { age: 40 },
 ]

function pickPropArray(objects, property){
    let filtered_objects = [];
    for(let object of objects){
        if(object.hasOwnProperty(property)){
            filtered_objects.push(object[property])
        }
    }
    return filtered_objects;
}
 
const result = pickPropArray(students, 'name')
console.log(result) 

// 2 задание 
console.log("2 задание")
function createCounter() {
    let count = 0; 
  
    return function() {
        count++; 
        console.log(count); 
    };
}
  
const counter1 = createCounter();
counter1() // 1
counter1() // 2

const counter2 = createCounter();
counter2() // 1
counter2() // 2

// 3 задание
console.log("3 задание")
function spinWords(sentence){
    let wordsArray = sentence.split(' ');
    let new_words = [];
    for (word of wordsArray) {
        if (word.length >= 5) {
            new_words.push(word.split('').reverse().join('')); 
        }
        else{
            new_words.push(word);
        }
    }
    return new_words.join(' ');
}

const result1 = spinWords( "Привет от Legacy" )
console.log(result1) // тевирП от ycageL

const result2 = spinWords( "This is a test")
console.log(result2) // This is a test

// 4 задание
console.log("4 задание")

function findTwoIndexes(nums, target){
    let indexes = [];
    for(let i = 0; i < nums.length; i++){
        if(indexes.length == 2){
            break;
        }
        for(let j = i+1; j < nums.length; j++){
            if(nums[i] + nums[j] === target){
                indexes.push(i);
                indexes.push(j);
            }
        }
    }
    return indexes;
}

let nums = [2, 7, 11, 15];
let target = 9;

let result3 = findTwoIndexes(nums, target);
console.log(result3); // Выведет [0, 1]

// 5 задание
console.log("5 задание")

function findPrefix(strs){
    if(strs.length == 0)
        return "";
    let word = strs[0];
    let result = "";
    for(let i = 0; i < word.length; i++){
        let prefix = word[i];
        for(let j = i+1; j < word.length; j++){
            prefix += word[j];
            let sum = 0;
            for(str of strs){
                if(str.indexOf(prefix) != -1)
                    sum += 1;
            }
            if(sum == strs.length && result.length <= prefix.length)
                result = prefix
        }
    }
    return result;
}

let strs = ["цветок","поток","хлопок"]
console.log(findPrefix(strs)) // Вывод: "ок"

strs = ["собака","гоночная машина","машина"]
console.log(findPrefix(strs)) //Вывод: ""

strs = ["прсто", "провесто", "прокасто"]
console.log(findPrefix(strs)) //Вывод: "сто"