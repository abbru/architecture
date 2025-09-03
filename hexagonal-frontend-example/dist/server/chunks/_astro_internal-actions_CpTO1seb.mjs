import './_astro_actions_D8Wr8XK3.mjs';
import { z } from 'zod';
import { A as AstroError, T as ActionCalledFromServerError } from './astro/assets-service_DzUBTucd.mjs';
import { i as isActionAPIContext } from './utils_Cwo9_uli.mjs';
import { c as callSafely, a as ActionError, b as ActionInputError } from './shared_DEMpMN1l.mjs';

function defineAction({
  accept,
  input: inputSchema,
  handler
}) {
  const serverHandler = getFormServerHandler(handler, inputSchema) ;
  async function safeServerHandler(unparsedInput) {
    if (typeof this === "function" || !isActionAPIContext(this)) {
      throw new AstroError(ActionCalledFromServerError);
    }
    return callSafely(() => serverHandler(unparsedInput, this));
  }
  Object.assign(safeServerHandler, {
    orThrow(unparsedInput) {
      if (typeof this === "function") {
        throw new AstroError(ActionCalledFromServerError);
      }
      return serverHandler(unparsedInput, this);
    }
  });
  return safeServerHandler;
}
function getFormServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (!(unparsedInput instanceof FormData)) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts FormData."
      });
    }
    if (!inputSchema) return await handler(unparsedInput, context);
    const baseSchema = unwrapBaseObjectSchema(inputSchema, unparsedInput);
    const parsed = await inputSchema.safeParseAsync(
      baseSchema instanceof z.ZodObject ? formDataToObject(unparsedInput, baseSchema) : unparsedInput
    );
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function formDataToObject(formData, schema) {
  const obj = schema._def.unknownKeys === "passthrough" ? Object.fromEntries(formData.entries()) : {};
  for (const [key, baseValidator] of Object.entries(schema.shape)) {
    let validator = baseValidator;
    while (validator instanceof z.ZodOptional || validator instanceof z.ZodNullable || validator instanceof z.ZodDefault) {
      if (validator instanceof z.ZodDefault && !formData.has(key)) {
        obj[key] = validator._def.defaultValue();
      }
      validator = validator._def.innerType;
    }
    if (!formData.has(key) && key in obj) {
      continue;
    } else if (validator instanceof z.ZodBoolean) {
      const val = formData.get(key);
      obj[key] = val === "true" ? true : val === "false" ? false : formData.has(key);
    } else if (validator instanceof z.ZodArray) {
      obj[key] = handleFormDataGetAll(key, formData, validator);
    } else {
      obj[key] = handleFormDataGet(key, formData, validator, baseValidator);
    }
  }
  return obj;
}
function handleFormDataGetAll(key, formData, validator) {
  const entries = Array.from(formData.getAll(key));
  const elementValidator = validator._def.type;
  if (elementValidator instanceof z.ZodNumber) {
    return entries.map(Number);
  } else if (elementValidator instanceof z.ZodBoolean) {
    return entries.map(Boolean);
  }
  return entries;
}
function handleFormDataGet(key, formData, validator, baseValidator) {
  const value = formData.get(key);
  if (!value) {
    return baseValidator instanceof z.ZodOptional ? void 0 : null;
  }
  return validator instanceof z.ZodNumber ? Number(value) : value;
}
function unwrapBaseObjectSchema(schema, unparsedInput) {
  while (schema instanceof z.ZodEffects || schema instanceof z.ZodPipeline) {
    if (schema instanceof z.ZodEffects) {
      schema = schema._def.schema;
    }
    if (schema instanceof z.ZodPipeline) {
      schema = schema._def.in;
    }
  }
  if (schema instanceof z.ZodDiscriminatedUnion) {
    const typeKey = schema._def.discriminator;
    const typeValue = unparsedInput.get(typeKey);
    if (typeof typeValue !== "string") return schema;
    const objSchema = schema._def.optionsMap.get(typeValue);
    if (!objSchema) return schema;
    return objSchema;
  }
  return schema;
}

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  updateEmail(newEmail) {
    if (!newEmail.includes("@")) throw new Error("Invalid email");
    this.email = newEmail;
  }
  getDisplayName() {
    return `${this.name} (${this.email})`;
  }
}

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async createUser(name, email) {
    const user = new User(crypto.randomUUID(), name, email);
    await this.userRepository.save(user);
    return user;
  }
  async updateUserEmail(id, newEmail) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");
    user.updateEmail(newEmail);
    await this.userRepository.update(user);
    return user;
  }
  async getUser(id) {
    return this.userRepository.findById(id);
  }
}

class InMemoryUserRepository {
  getUsers() {
    const stored = localStorage.getItem("users");
    if (stored) {
      const usersObj = JSON.parse(stored);
      const users = /* @__PURE__ */ new Map();
      for (const [id, userData] of Object.entries(usersObj)) {
        users.set(id, new User(userData.id, userData.name, userData.email));
      }
      return users;
    }
    return /* @__PURE__ */ new Map();
  }
  saveUsers(users) {
    const usersObj = {};
    for (const [id, user] of users) {
      usersObj[id] = { id: user.id, name: user.name, email: user.email };
    }
    localStorage.setItem("users", JSON.stringify(usersObj));
  }
  async save(user) {
    const users = this.getUsers();
    users.set(user.id, user);
    this.saveUsers(users);
  }
  async update(user) {
    const users = this.getUsers();
    users.set(user.id, user);
    this.saveUsers(users);
  }
  async findById(id) {
    const users = this.getUsers();
    return users.get(id) || null;
  }
}

const userRepo = new InMemoryUserRepository();
const userService = new UserService(userRepo);
const server = {
  createUser: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email format")
    }),
    handler: async (input) => {
      try {
        const newUser = await userService.createUser(input.name, input.email);
        return {
          success: true,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
          }
        };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  })
};

export { server };
