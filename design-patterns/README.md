# 🏗️ Charla sobre Patrones de Diseño: Factory, Builder y Repository

## 🎤 Introducción

En el desarrollo de software nos enfrentamos constantemente a problemas recurrentes.  
Los **patrones de diseño** surgen como soluciones probadas a esos problemas comunes, ayudándonos a escribir código más **flexible, reutilizable y mantenible**.

En esta charla vamos a enfocarnos en tres patrones muy utilizados:

- **Factory**: creación de objetos sin exponer la lógica al cliente.
- **Builder**: construcción paso a paso de objetos complejos.
- **Repository**: separación entre la lógica de negocio y la persistencia de datos.

---

## ❓ Por qué usar patrones

- Reducen la duplicación de código.
- Mejoran la legibilidad y comprensión.
- Facilitan cambios futuros y escalabilidad.
- Son parte de un "lenguaje común" entre desarrolladores.

---

## 🏭 Patrón Factory

### Idea principal

El patrón **Factory** permite **crear objetos sin exponer la lógica de creación al cliente**, delegando la responsabilidad a una clase especial llamada _Factory_.

### Ejemplo

Imaginemos que necesitamos crear diferentes tipos de **conexiones a base de datos** (MySQL, PostgreSQL, SQLite).

```php
interface DBConnection {
    public function connect(): void;
}

class MySQLConnection implements DBConnection {
    public function connect(): void {
        echo "Conectando a MySQL...";
    }
}

class PostgresConnection implements DBConnection {
    public function connect(): void {
        echo "Conectando a PostgreSQL...";
    }
}

class ConnectionFactory {
    public static function create(string $type): DBConnection {
        return match ($type) {
            'mysql' => new MySQLConnection(),
            'postgres' => new PostgresConnection(),
            default => throw new Exception("Tipo de conexión no soportada"),
        };
    }
}
```

### Uso

```php
$conn = ConnectionFactory::create('mysql');
$conn->connect();
```

## 🧱 Patrón Builder

### Idea principal

El patrón Builder se utiliza para construir objetos complejos paso a paso, permitiendo crear distintas representaciones de un mismo objeto.

Ejemplo

Supongamos que queremos construir un usuario que puede tener distintos atributos opcionales.

```php
class User {
    public function __construct(
        public string $name,
        public string $email,
        public ?string $phone = null,
        public ?string $address = null
    ) {}
}

class UserBuilder {
    private string $name;
    private string $email;
    private ?string $phone = null;
    private ?string $address = null;

    public function setName(string $name): self {
        $this->name = $name;
        return $this;
    }

    public function setEmail(string $email): self {
        $this->email = $email;
        return $this;
    }

    public function setPhone(string $phone): self {
        $this->phone = $phone;
        return $this;
    }

    public function setAddress(string $address): self {
        $this->address = $address;
        return $this;
    }

    public function build(): User {
        return new User($this->name, $this->email, $this->phone, $this->address);
    }
}
```

### Uso

```php
$user = (new UserBuilder())
    ->setName("Abbru")
    ->setEmail("abbru@mail.com")
    ->setPhone("123456789")
    ->build();
```

## 📦 Patrón Repository

### Idea principal

El patrón Repository actúa como un intermediario entre la lógica de negocio y la base de datos.
Permite tratar los datos como colecciones de objetos en memoria, sin preocuparnos por los detalles de persistencia.
Se basa en una interfaz que define el contrato, permitiendo múltiples implementaciones.

Ejemplo

Supongamos un CRUD de usuarios. Aquí mostramos dos implementaciones: una en memoria y otra con base de datos.

```php
interface UserRepositoryInterface {
    public function add(User $user): void;
    public function findByEmail(string $email): ?User;
    public function all(): array;
}

class InMemoryUserRepository implements UserRepositoryInterface {
    private array $users = [];

    public function add(User $user): void {
        $this->users[] = $user;
    }

    public function findByEmail(string $email): ?User {
        foreach ($this->users as $user) {
            if ($user->email === $email) {
                return $user;
            }
        }
        return null;
    }

    public function all(): array {
        return $this->users;
    }
}

class DatabaseUserRepository implements UserRepositoryInterface {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function add(User $user): void {
        $stmt = $this->pdo->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
        $stmt->execute([$user->name, $user->email]);
    }

    public function findByEmail(string $email): ?User {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ? new User($data['name'], $data['email']) : null;
    }

    public function all(): array {
        $stmt = $this->pdo->query("SELECT * FROM users");
        $users = [];
        while ($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $users[] = new User($data['name'], $data['email']);
        }
        return $users;
    }
}
```

### Uso

```php
// En memoria
$repo = new InMemoryUserRepository();
$repo->add($user);
$found = $repo->findByEmail("abbru@mail.com");

// Con base de datos
$pdo = new PDO('mysql:host=localhost;dbname=test', 'user', 'pass');
$dbRepo = new DatabaseUserRepository($pdo);
$dbRepo->add($user);
$found = $dbRepo->findByEmail("abbru@mail.com");
```

## ✅ Conclusiones

Factory → Simplifica la creación de objetos.

Builder → Ideal para construir objetos complejos.

Repository → Desacopla la lógica de negocio de la persistencia.

👉 Con estos tres patrones podemos lograr código más limpio, flexible y escalable.

Para explorar más patrones de diseño, visita: https://refactoring.guru/es/design-patterns
