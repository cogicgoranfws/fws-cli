import { Command } from "commander";
import { prompt } from "inquirer";

const no_command_provided_questions = [
  {
    message: "Questions number 1",
    name: "question1",
  },
  {
    message: "Questions number 2",
    name: "question2",
  },
];

export class App {
  static #program: Command | null = null;

  static init = (program: Command) => {
    if (this.#program instanceof Command)
      throw new Error("Program is already initiated");
    this.#program = program;
    this.#createCommands();
    this.#program.parse(process.argv);
    this.#inquireOnNoCommand();
  };

  static #createCommands = () => {
    this.#createAddNumbersCommand();
    this.#createSaddNumbersCommand();
  };

  static #createAddNumbersCommand = () => {
    if(!(this.#program instanceof Command)) throw new Error('Invalid Program');
    this.#program.command("add <num1> <num2>").action((num1, num2) => {
      console.log(num1, num2);
    });
  };

  static #createSaddNumbersCommand = () => {
    if(!(this.#program instanceof Command)) throw new Error('Invalid Program');
    this.#program.command("sad <num1> <num2>").action((num1, num2) => {
      console.log(num1, num2);
    });
  };

  static #inquireOnNoCommand = async () => {
    try {
      if(!(this.#program instanceof Command)) throw new Error('Invalid Program');
      const NO_COMMAND_PROVIDED = this.#program.args.length === 0;
      if (NO_COMMAND_PROVIDED) {
        const answers = await prompt(no_command_provided_questions);
        console.log(answers);
      }
    } catch (error) {
      console.error(error);
    }
  };
}
