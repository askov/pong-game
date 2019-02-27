export class GameField {
  constructor(
    private color: string = 'gray',
    private width: number = 300,
    private height: number = 200,
    ) {
      console.log('constructor GameField');
  }
  debug() {
    console.log('debug', {
      color: this.color,
      width: this.width,
      height: this.height,
    })
  }
}