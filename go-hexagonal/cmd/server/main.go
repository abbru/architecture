package main

import (
	"log"
	"net/http"

	"example.com/go-hexagonal/user/application"
	"example.com/go-hexagonal/user/infrastructure"
)

func main() {
	repo := infrastructure.NewInMemoryUserRepository()
	service := application.NewUserService(repo)
	handler := infrastructure.NewUserHandler(service)

	// 👇 Ruta manual usando http.HandleFunc
	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			handler.GetUsers(w, r)
			return
		}
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	})

	log.Println(" Server running on http://localhost:3000")
	http.ListenAndServe(":3000", nil)
}
