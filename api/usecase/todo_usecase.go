package usecase

import (
	"fmt"
	"go-api/model"
	"go-api/repository"
)

type TodoUseCase struct {
	// Repository
	// repository repository.TodoRepository
	repository repository.TodoRepository
}

func NewTodoUseCase(repository repository.TodoRepository) TodoUseCase {
	return TodoUseCase{
		repository: repository,
	}
}

func (tu *TodoUseCase) GetAllTodos(status string) ([]model.Todo, error) {
	return tu.repository.GetAllTodos(status)
}

func (tu *TodoUseCase) CreateTodo(todo model.Todo) (model.Todo, error) {
	id, err := tu.repository.CreateTodo(todo)

	if err != nil {
		fmt.Println(err)
		return model.Todo{}, err
	}

	todo.ID = id
	return todo, nil
}

func (tu *TodoUseCase) ChangeTodo(todo model.Todo) error {
	err := tu.repository.ChangeTodo(todo)

	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func (tu *TodoUseCase) DeleteTodo(id int) (int, error) {
	fmt.Println(id)
	deletedID, err := tu.repository.DeleteTodo(id)

	if err != nil {
		fmt.Println(err)
		return 0, err
	}

	return deletedID, nil
}
