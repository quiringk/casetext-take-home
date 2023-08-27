export interface Account {
  name: string;
  pin: string; // keeping it as a string to ensure leading zeros are preserved
  balance: number;
  creditCard: string;
}
