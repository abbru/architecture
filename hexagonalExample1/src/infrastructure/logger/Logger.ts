import { LoggerInterface } from "./LoggerInterface";

export class Logger implements LoggerInterface {
  log(message: string): void {
    console.log(`Log: ${message}`);
  }
}
