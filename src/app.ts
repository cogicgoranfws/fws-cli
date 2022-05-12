import { Command } from "commander";
import { prompt } from "inquirer";
import type { QuestionCollection } from "inquirer";
import { CreateProjectStarter } from "./createProjectStarter";
import { CreateComponent } from "./createComponent";

const mainChoices = [
  "Create Project Starter",
  "Create component for existing project",
  "Exit",
];

const no_command_provided_questions: QuestionCollection<any> = [
  {
    name: "mainChoice",
    message: "What would you like to do?",
    type: "list",
    choices: mainChoices,
  },
];

interface ChoiceActionI {
  [key: string]: () => void;
}

const choiceAction: ChoiceActionI = {
  "Create Project Starter": () => {
    CreateProjectStarter.init();
  },
  "Create component for existing project": () => {
    CreateComponent.init();
  },
  Exit: () => {
    App.exit();
  },
};

export class App {
  static #program: Command | null = null;

  static init = (program: Command) => {
    if (this.#program instanceof Command)
      throw new Error("Program is already initiated");
    this.#program = program;
    this.#program.parse(process.argv);
    // error on unknown commands
    this.#createCommands();
    this.#inquireOnNoCommand();
  };

  static #createCommands = () => {
    this.#createAddNumbersCommand();
    this.#createSaddNumbersCommand();
  };

  static #createAddNumbersCommand = () => {
    if (!(this.#program instanceof Command)) throw new Error("Invalid Program");
    this.#program.command("add <num1> <num2>").action((num1, num2) => {
      console.log(num1, num2);
    });
  };

  static #createSaddNumbersCommand = () => {
    if (!(this.#program instanceof Command)) throw new Error("Invalid Program");
    this.#program.command("sad <num1> <num2>").action((num1, num2) => {
      console.log(num1, num2);
    });
  };

  static #handleMainChoice = (choice: string) => {
    if(choiceAction[choice]) choiceAction[choice]();
  };

  static #inquireOnNoCommand = async () => {
    try {
      if (!(this.#program instanceof Command))
        throw new Error("Invalid Program");
      const NO_COMMAND_PROVIDED = this.#program.args.length === 0;
      if (NO_COMMAND_PROVIDED) {
        const answer: string = (await prompt(no_command_provided_questions))
          .mainChoice;
        this.#handleMainChoice(answer);
      }
    } catch (error) {
      console.error(error);
    }
  };

  static exit = () => {
    console.log("BYE <3");
    process.exit(0);
  }
}
