
export interface CurrencyConverter {
    convert(from: string, to: string, amount: number): Promise<number>;
}