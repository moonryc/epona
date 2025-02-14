import { ToolMaker } from './';

type AddTwoNumbersInput = {
  a:number;
  b:number;
}

export default new ToolMaker({
  toolDefinition:{
    name: 'addTwoNumbers',
    description: 'Add two numbers together',
    parameters: {
      type: 'object',
      required: ['a', 'b'],
      properties: {
        a: { type: 'number', description: 'The first number' },
        b: { type: 'number', description: 'The second number' }
      }
    }
  },
  toolFunction: (input)=>{
    const {a,b} = input as AddTwoNumbersInput
    const result = a+b
    return result.toString()
  },
})
