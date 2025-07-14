package infrastructure

import (
	"database/sql"
	"fmt"

	"example.com/go-hexagonal/user/domain"
)

type PostgresUserRepository struct {
	DB *sql.DB
}

func NewPostgresUserRepository(db *sql.DB) *PostgresUserRepository {
	return &PostgresUserRepository{DB: db}
}

func (r *PostgresUserRepository) Save(user domain.User) error {
	_, err := r.DB.Exec("INSERT INTO users (name) VALUES ($1)", user.Name)
	if err != nil {
		return fmt.Errorf("error inserting user: %w", err)
	}
	return nil
}

func (r *PostgresUserRepository) FindAll() ([]domain.User, error) {
	rows, err := r.DB.Query("SELECT name FROM users")
	if err != nil {
		return nil, fmt.Errorf("error querying users: %w", err)
	}
	defer rows.Close()

	var users []domain.User
	for rows.Next() {
		var u domain.User
		if err := rows.Scan(&u.Name); err != nil {
			return nil, fmt.Errorf("error scanning user: %w", err)
		}
		users = append(users, u)
	}

	return users, nil
}
