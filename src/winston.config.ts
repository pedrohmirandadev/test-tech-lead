import { transports, createLogger, format } from "winston";
import { Logform } from "winston";

export const winstonLogger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(),
        format.printf(
            ({ timestamp, level, message }: Logform.TransformableInfo) => {
                return `${timestamp} [${level}]: ${message}`;
            },
        ),
    ),
    transports: [
        new transports.File({ filename: "logs/app.log" }),
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        }),
    ],
});
