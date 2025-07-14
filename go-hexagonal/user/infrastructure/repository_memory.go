package infrastructure

import (
	"example.com/go-hexagonal/user/domain"
)

type InMemoryUserRepository struct {
	users []domain.User
}

func NewInMemoryUserRepository() *InMemoryUserRepository {
	return &InMemoryUserRepository{
		users: []domain.User{
			{Name: "Abbru"}, // 👈 precargado
		},
	}
}

func (r *InMemoryUserRepository) Save(user domain.User) error {
	r.users = append(r.users, user)
	return nil
}

func (r *InMemoryUserRepository) FindAll() ([]domain.User, error) {
	return r.users, nil
}
