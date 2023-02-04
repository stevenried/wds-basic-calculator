class Calculator {
  constructor(prevOperandElement, curOperandElement) {
    this.prevOperandElement = prevOperandElement
    this.curOperandElement = curOperandElement
    this.clear()
  }

  clear() {
    this.curOperand = ''
    this.prevOperand = ''
    this.operation = undefined
  }

  delete() {
    this.curOperand = this.curOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.curOperand.includes('.')) return
    this.curOperand = this.curOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.curOperand === '') return
    if (this.prevOperand != '') {
      this.compute()
    }
    this.operation = operation
    this.prevOperand = this.curOperand
    this.curOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.prevOperand)
    const cur = parseFloat(this.curOperand)

    if (isNaN(prev) || isNaN(cur)) return

    switch (this.operation) {
      case '+':
        computation = prev + cur
        break
      case '−':
        computation = prev - cur
        break
      case '×':
        computation = prev * cur
        break
      case '÷':
        computation = prev / cur
        break
      default:
        return
    }

    this.curOperand = computation
    this.operation = undefined
    this.prevOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()

    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]

    let integerDisplay

    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      })
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.curOperandElement.innerText = this.getDisplayNumber(this.curOperand)

    if (this.operation != null) {
      this.prevOperandElement.innerText = `${this.prevOperand} ${this.operation}`
    } else {
      this.prevOperandElement.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearAllButton = document.querySelector('[data-clear-all]')

const prevOperandElement = document.querySelector('[data-prev-operand]')
const curOperandElement = document.querySelector('[data-cur-operand]')

const calculator = new Calculator(prevOperandElement, curOperandElement)

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

clearAllButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})
