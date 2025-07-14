package application

import (
	"example.com/go-hexagonal/user/domain"
)

type UserService struct {
	Repo domain.UserRepository
}

func NewUserService(repo domain.UserRepository) *UserService {
	return &UserService{Repo: repo}
}

func (s *UserService) CreateUser(name string) error {
	user := domain.User{Name: name}
	return s.Repo.Save(user)
}

func (s *UserService) GetAllUsers() ([]domain.User, error) {
	return s.Repo.FindAll()
}
