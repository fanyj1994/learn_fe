// 1. 基本数据类型
let isNumber:number = 1
let isDone:boolean = true
let myName:string = 'Fan'
let nothing:void = null || undefined
let n:null = null
let u:undefined = undefined
let anything:any = 21 || '1' // 任意值，可以调用任何数据和方法，其返回也是任意值

// 2.

// 3.函数无返回值void
function alertSth():void {
  alert('sth')
}

function alertSth1():string {
  return 'abc'
}

interface Person {
  firstName: string;
  lastName: string
}

function greeter(person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName
}

let user = { firstName: 'Jane', lastName: 'User' }

document.body.innerHTML = greeter(user)

// 面向对象
class Student {
  fullName: string;
  constructor (public firstName, public middleInitial, public lastName) {
    this.fullName = firstName + ' ' + middleInitial + ' ' + lastName
  }
}

interface Person {
  fistName: string;
  lastName: string
}

function greeter (person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName
}

let user = new Student('Jane', 'M.', 'User')

document.body.innerHTML = greeter(user)

