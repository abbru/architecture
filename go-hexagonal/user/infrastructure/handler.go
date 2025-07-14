package infrastructure

import (
	"encoding/json"
	"net/http"

	"example.com/go-hexagonal/user/application"
)

type UserHandler struct {
	Service *application.UserService
}

func NewUserHandler(service *application.UserService) *UserHandler {
	return &UserHandler{Service: service}
}

func (h *UserHandler) GetUsers(w http.ResponseWriter, r *http.Request) {
	users, err := h.Service.GetAllUsers()
	if err != nil {
		http.Error(w, "Error getting users", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}
