import inquirer from "inquirer";
import chalk from "chalk";
import readline from "readline";
import { User } from "./user.js";
class SignUp {
    static async signUp() {
        const signInData = await inquirer.prompt([
            {
                name: "name",
                message: chalk.bold.italic.cyanBright("Enter Your name :"),
                type: "input",
                validate: (input) => !(input.trim() === "") || chalk.bold.redBright("Name is required."),
            },
            {
                name: "surName",
                type: "input",
                message: chalk.bold.italic.cyanBright("Enter Your Surname :"),
                validate: (input) => !(input.trim() === "") ||
                    chalk.bold.redBright("Surname is required."),
            },
            {
                name: "age",
                type: "input",
                message: chalk.bold.italic.cyanBright("Enter Your Age :"),
                validate: (input) => !(input.trim() === "") || chalk.bold.redBright("Age is required."),
            },
            {
                name: "gender",
                type: "list",
                message: chalk.bold.italic.cyanBright("Enter Your Gender :"),
                choices: ["Male", "Female", "Other"],
            },
            {
                name: "phone",
                type: "input",
                message: chalk.bold.italic.cyanBright("Enter Your Phone Number :"),
                validate: (input) => /^\d{10}$/.test(input) ||
                    chalk.bold.redBright("Invalid phone number format:"),
            },
            {
                name: "EmailID",
                message: chalk.bold.italic.cyanBright("Enter Your Email :"),
                type: "input",
                validate: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) ||
                    chalk.bold.redBright("Invalid email format:"),
            },
            {
                name: "password",
                type: "password",
                message: chalk.bold.italic.cyanBright("Enter Your Password : "),
                validate: (input) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input) ||
                    chalk.bold.redBright("Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and digit"),
            },
        ]);
        return new User(signInData.name, signInData.surName, signInData.age, signInData.gender, signInData.EmailID, signInData.password, signInData.phone);
    }
    static async login(savedUsers) {
        const loginData = await inquirer.prompt([
            {
                name: "EmailID",
                type: "input",
                message: chalk.bold.italic.cyanBright("Enter Your Email :"),
            },
            {
                name: "password",
                message: chalk.bold.italic.cyanBright("Enter Your Password :"),
                type: "password",
            },
        ]);
        const found = savedUsers.find((user) => user.EmailID === loginData.EmailID && user.password === loginData.password);
        if (found) {
            console.log(chalk.bold.italic.magentaBright(`\nWelcome back ${found.name}, Login successful ✅`));
            return found;
        }
        else {
            console.log(chalk.bold.italic.redBright("Login failed: Invalid User ID or Password.❌"));
            return null;
        }
    }
}
async function runApplication() {
    const users = [];
    while (true) {
        const { action } = await inquirer.prompt([
            {
                name: "action",
                message: chalk.bold.italic.cyanBright("Would you like to Signup, Login, or logOut"),
                type: "list",
                choices: ["Signup", "User Login", "LogOut"],
            },
        ]);
        switch (action) {
            case "Signup":
                const newUser = await SignUp.signUp();
                users.push(newUser);
                console.log(chalk.bold.italic.magentaBright("\nSignup Successful ✅"));
                break;
            case "User Login":
                const loggedInUser = await SignUp.login(users);
                if (loggedInUser) {
                    await selectLevel();
                }
                break;
            case "LogOut":
                process.exit(0);
                break;
        }
    }
}
class TypingTest {
    testText;
    timeLimit;
    constructor(testText, timeLimit) {
        this.testText = testText;
        this.timeLimit = timeLimit;
    }
    async runTest() {
        console.log(chalk.bold.italic.blueBright(`You must write the sentence within ${this.timeLimit / 60} Seconds.`));
        //await sleep(1000)
        console.log(chalk.bold.italic.magentaBright(`\n\tSentence to write: '${this.testText}'`));
        const userText = await this.takeTest();
        this.Test(userText);
    }
    async takeTest() {
        console.log(chalk.bold.italic.cyanBright("\nPlease write the sentence here...."));
        const test = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const startTime = new Date();
        return new Promise((res) => {
            const timer = setTimeout(() => {
                test.close();
                console.log(chalk.bold.italic.redBright("Time's up!❌ Test ended."));
                res("");
            }, this.timeLimit * 1000);
            test.question("", (answer) => {
                clearTimeout(timer);
                test.close();
                const endTime = new Date();
                const duration = (endTime.getTime() - startTime.getTime()) / 1000;
                console.log(chalk.bold.italic.blue(`\nYou typed the sentence in ${duration} seconds.`));
                res(answer);
            });
        });
    }
    Test(userText) {
        if (this.testText.trim() === userText.trim()) {
            console.log(chalk.bold.italic.magentaBright("\nVery good👍 You typed the correct sentence."));
            const wordsCount = this.testText.trim().split(" ").length;
            console.log(chalk.bold.italic.magentaBright("\n\tYour word count is: ", wordsCount));
            console.log(chalk.blue(`\nCorrect the sentence with a word count of ${wordsCount}`));
        }
        else {
            console.log(chalk.bold.italic.redBright("Your sentence is incorrect❌"));
        }
    }
}
async function startTypingTest(testText, timeLimit) {
    const typingTest = new TypingTest(testText, timeLimit);
    await typingTest.runTest();
}
async function selectLevel() {
    const { level } = await inquirer.prompt([
        {
            name: "level",
            message: chalk.bold.italic.cyanBright("Choose difficulty Level?"),
            type: "list",
            choices: ["Basic Sentence", "Random Words", "Technical Text"],
        },
    ]);
    switch (level) {
        case "Basic Sentence":
            await startTypingTest("Practice makes perfect", 60);
            break;
        case "Random Words":
            await startTypingTest("Comedy, Stubborn, Biography", 120);
            break;
        case "Technical Text":
            await startTypingTest("Programming is fun but challenging", 180);
            break;
        default:
            console.log(chalk.red("Invalid level selected."));
            break;
    }
}
runApplication();
