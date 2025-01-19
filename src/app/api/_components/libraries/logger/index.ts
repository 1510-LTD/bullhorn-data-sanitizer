import { pino } from "pino";
import "pino-pretty";

export const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true
    }
  },
  level: process.env.PINO_LOG_LEVEL || "info",

  redact: [] // prevent logging of sensitive data
});
