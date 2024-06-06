import chalk from "chalk";
import readline from "readline"

console.log(chalk.bold.bgRedBright("\nPre-Test Instructions:"));
console.log(chalk.bold.italic.blueBright("\n>> 1.Place your fingers in the proper typing position."));
console.log(chalk.bold.italic.blueBright("\n>> 2.Warm-up exercise with simple key combinations."));
console.log(chalk.bold.italic.magentaBright("\n\tStart Typing..."));
  


async function pre_test(){
	const preTest = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})
preTest.question(chalk.italic.cyanBright("Enter your text: "), (text) => {
preTest.question(chalk.bold.italic.cyanBright("Press enter to stop: "), () => {
	preTest.close()
console.log(text);
}

)
})
}
pre_test();