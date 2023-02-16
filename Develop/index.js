const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project? (this will be the title of the README)',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a description for your project',
    },
    {
        type: 'input',
        message: 'What are the instructions to install your project?',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'What are the features of your project?',
        name: 'features',
    },
    {
        type: 'input',
        message: 'Describe how to use your project',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'Describe how other developers can contribute to your project',
        name: 'contribution',
    },
    {
        type: 'input',
        message: 'Describe how to test your project',
        name: 'test',
    },
    {
        type: 'list',
        message: 'Under what license is your project?',
        name: 'license',
        choices: ["MIT","BSD","Apache"]
    }
];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
    err ? console.log(err) : console.log('Success!')
    );
}

function init() {
    inquirer
        .prompt(questions)
        .then(data => {
                let badge = "";
                switch (data.license){
                    case "Apache" : 
                        badge = "![badmath](https://img.shields.io/badge/license-Apache-lightgrey)"; 
                        break;                       
                    case "MIT":
                        badge = "![badmath](https://img.shields.io/badge/license-MIT-green)";  
                        break;                      
                    case "BSD":
                        badge = "![badmath](https://img.shields.io/badge/license-BSD-blue)";
                        break;
                    default: badge = "TBD";
                }
                data.license = badge;
                return data;
            })
        .then((data) => {writeToFile('README.md',generateMarkdown(data));
    });
};


init();


function generateMarkdown(data) {

return `# ${data.title}

## Description

Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:

${data.description}

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [License](#license)
- [How to contribute](#howtocontribute)
- [Tests](#testing)

## Installation

${data.installation}

## Features

${data.features}

## Usage

${data.usage}

## License

${data.license}

## How to Contribute

${data.contribution}

## Tests

${data.test}
`
}