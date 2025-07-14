package domain

type UserRepository interface {
	Save(user User) error
	FindAll() ([]User, error)
}
