package controller

import (
	"go-api/model"
	"go-api/usecase"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type todoController struct {
	//Usecase
	todoUseCase usecase.TodoUseCase
}

func NewTodoController(usecase usecase.TodoUseCase) todoController {
	return todoController{
		todoUseCase: usecase,
	}
}

func (t *todoController) GetAllTodos(ctx *gin.Context) {
	status := ctx.Param("status")

	todos, err := t.todoUseCase.GetAllTodos(strings.ToUpper(status))

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
	}
	ctx.JSON(http.StatusOK, todos)
}

// Post
func (t *todoController) CreateTodo(ctx *gin.Context) {
	var todo model.Todo

	err := ctx.BindJSON(&todo)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}

	insertedTodo, err := t.todoUseCase.CreateTodo(todo)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}

	ctx.JSON(http.StatusOK, insertedTodo)
}

func (t *todoController) ChangeTodo(ctx *gin.Context) {
	var todo model.Todo

	err := ctx.BindJSON(&todo)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}

	err = t.todoUseCase.ChangeTodo(todo)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}

	ctx.JSON(http.StatusOK, todo)
}

func (t *todoController) DeleteTodo(ctx *gin.Context) {
	id, err := strconv.ParseInt(ctx.Param("id"), 10, 8)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}

	deletedId, err := t.todoUseCase.DeleteTodo(int(id))

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}

	ctx.JSON(http.StatusOK, deletedId)
}
