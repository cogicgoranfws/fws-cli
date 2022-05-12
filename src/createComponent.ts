import { prompt } from "inquirer";
import type { QuestionCollection } from "inquirer";

const componentProject = [
  'Vue.js',
  'React.js',
  'NeXt.js',
  'Nest.js',
  'Laravel'
]

const frameworkPromptOptions : QuestionCollection<any> = [
  {
    name:'framework',
    message: 'Which framework are we using?',
    type: 'list',
    choices: componentProject
  }
]

export class CreateComponent {
  static init = async () => {
    const framework = (await prompt(frameworkPromptOptions)).framework;
    this.#handleChoice(framework);
  }

  static #handleChoice = (framework: string) => {
    console.log('Your framework choice:', framework);
  }
}

