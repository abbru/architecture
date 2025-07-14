import express from "express";

// Shared
import { PostgresConnection } from "./shared/infrastructure/PostgresConnection";
import { Logger } from "./shared/infrastructure/logger/Logger";

// User module
import { UserRepositoryImpl } from "./user/infrastructure/UserRepositoryImpl";
import { InMemoryUserRepository } from "./user/infrastructure/InMemoryUserRepository";
import { UserService } from "./user/application/UserService";
import { UserController } from "./user/infrastructure/UserController";

// Click module
import { ClickRepositoryImpl } from "./click/infrastructure/ClickRepositoryImpl";
import { InMemoryClickRepository } from "./click/infrastructure/InMemoryClickRepository";

// ⚙️ Config
const USE_IN_MEMORY = true; // cambiar a false para usar PostgreSQL

const app = express();
app.use(express.json());

// 🔌 Dependencias
const logger = new Logger();

let userRepository;
let clickRepository;

if (USE_IN_MEMORY) {
  userRepository = new InMemoryUserRepository();
  clickRepository = new InMemoryClickRepository();
} else {
  const db = new PostgresConnection();
  userRepository = new UserRepositoryImpl(db);
  clickRepository = new ClickRepositoryImpl(db);
}

const userService = new UserService(userRepository, logger, clickRepository);
const userController = new UserController(userService);

// 📦 Rutas
app.use("/api", userController.router);

export default app;
