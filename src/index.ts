import { SimpleCurrencyConverter } from "./services/SimpleCurrencyConverter";
import readline from 'readline'
import { promisify } from 'util'
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
const userInput = promisify(reader.question).bind(reader)

async function getUserInput (prompt: string): Promise<any> {
    return await userInput(prompt)
}
const axios = require('axios');

class CurrencyConverterClient {
    converter: SimpleCurrencyConverter;
    constructor(converter: SimpleCurrencyConverter) {
        this.converter = converter;
    }

    async convertCurrency(from: string, to: string, amount: number) {
        try {
            const result = await this.converter.convert(from, to, amount);
            console.log(`${amount} ${from} equals ${result} ${to}`);
        } catch (error) {
            console.error('Error converting currency:');
        }
    }
}

// Utilizando o SimpleCurrencyConverter com a instância padrão do Axios
const converter = new SimpleCurrencyConverter(axios);
const client = new CurrencyConverterClient(converter);

// Mostrando o menu de opções
const options = ['EUR', 'USD', 'BRL', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY'];

async function showMenu() {
    console.log('------------------------------------');
    //declarando tipos
    var optionFrom: string = '';
    var optionTo: string = '';
    var amount: string = '';
    console.log('Digite "exit" para sair a qualquer momento');
    console.log('Moedas disponíveis: ' + options);
    optionFrom = await getUserInput('Escolha a moeda de origem: ');
    if (optionFrom === 'exit') {process.exit();}
    optionTo = await getUserInput('Escolha a moeda de destino: ');
    if (optionTo === 'exit') {process.exit();}
    amount = await getUserInput('Escolha a quantidade: ');
    if (amount === 'exit') {process.exit();}
    await client.convertCurrency(optionFrom, optionTo, parseFloat(amount));
    console.log('------------------------------------');
    showMenu();
}

showMenu();

