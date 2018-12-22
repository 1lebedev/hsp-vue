export const store = {
  state: {
    colorsAmount: 20,
    s: 100,
    l: 70
  },
  addNumber(newNumber) {
    this.state.numbers.push(newNumber);
  },
  updateColorsAmount(newCount) {
    this.state.colorsAmount = newCount;
  }
};
