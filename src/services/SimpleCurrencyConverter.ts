
import { AxiosInstance } from 'axios';
import { CurrencyConverter } from './interfaces/CurrencyConverter';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;

// Implementação do conversor de moeda
export class SimpleCurrencyConverter implements CurrencyConverter {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async convert(from: string, to: string, amount: number): Promise<number> {
        try {
            const response = await this.api.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`);
            const rates = response.data.conversion_rates;
            const exchangeRate = rates[to];
            if (!exchangeRate) {
                throw new Error(`Conversion rate from ${from} to ${to} not found.`);
            }
            return exchangeRate * amount;
        } catch (error) {
            console.error('Error fetching conversion rates:', error);
            throw new Error('Failed to convert currency.');
        }
    }
}