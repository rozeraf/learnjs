const firstInput = prompt("Введите первое число: ")
const firstNumber = Number(firstInput)
if (isNaN(firstNumber)) {
    console.log(`Значение ${firstNumber} не является чилом`)
    process.exit(1)
}
const operator = prompt("Введите операцию: ")

const secondInput = prompt("Введите второе число: ")
const secondNumber = Number(secondInput)
if (isNaN(secondNumber)) {
    console.log(`Значение ${secondNumber} не является чилом`)
    process.exit(1)
}
let result: number;

switch(operator) {
    case '+':
        result = firstNumber + secondNumber;
        break;
    case '-':
        result = firstNumber - secondNumber;
        break;
    case '*':
        result = firstNumber * secondNumber;
        break;
    case '/':
        if (secondNumber === 0) {
            console.error("Ошибка, нельзя делить на ноль")
            process.exit(1)
        }
        result = firstNumber / secondNumber;
        break;
    default:
        console.log(`Неизвестная операция: ${operator}`)
        process.exit(1)
}

result !== undefined && console.log(`Результат: ${result}`)