package main

import (
	"go-api/controller"
	"go-api/db"
	"go-api/repository"
	"go-api/usecase"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Connection DB
	dbConnect, err := db.ConnectDB()

	if err != nil {
		panic(err)
	}

	// Repository
	TodoRepository := repository.NewTodoRepository(dbConnect)

	// UseCase
	TodoUseCase := usecase.NewTodoUseCase(TodoRepository)

	// Camada de Controllers
	TodoController := controller.NewTodoController(TodoUseCase)

	server := gin.Default()

	// Cors
	// server.Use(corsMiddleware())

	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Substitua pela URL do seu frontend
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Rotas
	server.GET("/todos/:status", TodoController.GetAllTodos)
	server.POST("/todo", TodoController.CreateTodo)
	server.PUT("/todo", TodoController.ChangeTodo)
	server.DELETE("/todo/:id", TodoController.DeleteTodo)

	server.Run(":8000")
}

// CORS middleware function definition
func corsMiddleware() gin.HandlerFunc {
	// Define allowed origins as a comma-separated string
	originsString := "https://example.com,https://test.com"
	var allowedOrigins []string
	if originsString != "" {
		// Split the originsString into individual origins and store them in allowedOrigins slice
		allowedOrigins = strings.Split(originsString, ",")
	}

	// Return the actual middleware handler function
	return func(c *gin.Context) {
		// Function to check if a given origin is allowed
		isOriginAllowed := func(origin string, allowedOrigins []string) bool {
			for _, allowedOrigin := range allowedOrigins {
				if origin == allowedOrigin {
					return true
				}
			}
			return false
		}

		// Get the Origin header from the request
		origin := c.Request.Header.Get("*")

		// Check if the origin is allowed
		if isOriginAllowed(origin, allowedOrigins) {
			// If the origin is allowed, set CORS headers in the response
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
			c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
			c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
			c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		}

		// Handle preflight OPTIONS requests by aborting with status 204
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		// Call the next handler
		c.Next()
	}
}
