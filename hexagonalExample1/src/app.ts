import express from "express";
import { PostgresConnection } from "./infrastructure/database/PostgresConnection";
import { UserRepositoryImpl } from "./infrastructure/repositories/UserRepositoryImpl";
import { ClickRepositoryImpl } from "./infrastructure/repositories/ClickRepositoryImpl";
import { Logger } from "./infrastructure/logger/Logger";
import { UserService } from "./application/services/UserService";
import { UserController } from "./infrastructure/web/UserController";

import { InMemoryUserRepository } from "./infrastructure/repositories/InMemoryUserRepository";
import { InMemoryClickRepository } from "./infrastructure/repositories/InMemoryClickRepository";

const app = express();
app.use(express.json());

// const dbConnection = new PostgresConnection();
// const userRepository = new UserRepositoryImpl(dbConnection);
// const clickRepository = new ClickRepositoryImpl(dbConnection);

const userRepository = new InMemoryUserRepository();
const clickRepository = new InMemoryClickRepository();
const logger = new Logger();

const userService = new UserService(userRepository, logger, clickRepository);
const userController = new UserController(userService);

app.use("/api", userController.router);

export default app;
