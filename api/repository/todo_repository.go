package repository

import (
	"database/sql"
	"fmt"
	"go-api/model"
	"time"
)

type TodoRepository struct {
	connection *sql.DB
}

func NewTodoRepository(db *sql.DB) TodoRepository {
	return TodoRepository{
		connection: db,
	}
}

func (tr *TodoRepository) GetAllTodos(status string) ([]model.Todo, error) {
	// Query to get all todos from the database
	query := "SELECT id, title, description, status, dtCreate, dtChange FROM todo WHERE status = $1"

	// Execute the query and get the result
	rows, err := tr.connection.Query(query, status)

	// Verify if there was an error executing the query
	if err != nil {
		// fmt.Println(err)
		return []model.Todo{}, err
	}

	// Create a list to store the todos
	var todosList []model.Todo
	var todoObj model.Todo

	println(rows)
	for rows.Next() {
		err = rows.Scan(
			&todoObj.ID,
			&todoObj.Title,
			&todoObj.Description,
			&todoObj.Status,
			&todoObj.DtCreate,
			&todoObj.DtChange,
		)

		if err != nil {
			// fmt.Println(err)
			return []model.Todo{}, err
		}

		todosList = append(todosList, todoObj)
	}

	rows.Close()

	return todosList, nil
}

func (tr *TodoRepository) CreateTodo(todo model.Todo) (int, error) {
	// query = `INSERT INTO todo(title, description, status, dtCreate, dtChange) values()`

	var id int

	query, err := tr.connection.Prepare("INSERT INTO todo" +
		"(title, description, status, dtCreate, dtChange)" +
		"VALUES($1, $2, $3, $4, $5)")

	if err != nil {
		fmt.Println(err)
		return 0, nil
	}

	err = query.QueryRow(todo.Title, todo.Description, todo.Status, todo.DtCreate, todo.DtChange).Scan(&id)

	if err != nil {
		fmt.Println(err)
		return 0, nil
	}

	query.Close()
	return id, nil
}

func (tr *TodoRepository) ChangeTodo(todo model.Todo) error {
	query := "UPDATE todo SET title = $1, description = $2, status = $3, dtChange = $4 WHERE id = $5"

	_, err := tr.connection.Exec(query, todo.Title, todo.Description, todo.Status, time.Now(), todo.ID)

	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func (tr *TodoRepository) DeleteTodo(id int) (int, error) {
	query := "DELETE FROM todo WHERE id = $1"

	_, err := tr.connection.Exec(query, id)

	if err != nil {
		fmt.Println(err)
		return 0, err
	}

	return id, nil
}
