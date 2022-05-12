import { prompt } from "inquirer";
import type { QuestionCollection } from "inquirer";

const projectStarterChoices = [
  'Vue.js',
  'React.js',
  'NeXt.js',
  'Nest.js',
  'Laravel'
]

const projectStarterPromptOptions : QuestionCollection<any> = [
  {
    name:'framework',
    message: 'Which framework are we using?',
    type: 'list',
    choices: projectStarterChoices
  }
]

export class CreateProjectStarter {
  static init = async () => {
    const framework = (await prompt(projectStarterPromptOptions)).framework;
    this.#handleChoice(framework);
  }

  static #handleChoice = (framework: string) => {
    console.log('Your framework choice:', framework);
  }
}

