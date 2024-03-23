import { AxiosInstance } from "axios";
import { SimpleCurrencyConverter } from "./SimpleCurrencyConverter";
import { CurrencyConverter } from "./interfaces/CurrencyConverter";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;
// Mock da API para testes
const mockApi: AxiosInstance = {
    get: jest.fn().mockResolvedValue({
        data: {
            conversion_rates: {
                USD: 1.2,
                AUD: 1.5,
                BGN: 1.6,
                CAD: 1.3,
                CHF: 1,
                CNY: 6.9,
                EGP: 15.7,
                EUR: 1,
                GBP: 0.8,
            }
        }
    })
} as unknown as AxiosInstance;

// Testes usando Jest
describe('CurrencyConverter', () => {
  let converter: CurrencyConverter;

  beforeEach(() => {
      converter = new SimpleCurrencyConverter(mockApi);
  });

  test('convert EUR to USD', async () => {
      const convertedAmount = await converter.convert('EUR', 'USD', 100);
      const expected_call = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`;
      expect(mockApi.get).toHaveBeenCalledWith(expected_call);
      expect(convertedAmount).toBeCloseTo(120);
  });
  test('convert EUR to GBP', async () => {
      const convertedAmount = await converter.convert('EUR', 'GBP', 100);
      const expected_call = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`;
      expect(mockApi.get).toHaveBeenCalledWith(expected_call);
      expect(convertedAmount).toBeCloseTo(80);
  });
  test('convert EUR to CNY', async () => {
      const convertedAmount = await converter.convert('EUR', 'CNY', 100);
      const expected_call = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`;
      expect(mockApi.get).toHaveBeenCalledWith(expected_call);
      expect(convertedAmount).toBeCloseTo(690);
  });
});