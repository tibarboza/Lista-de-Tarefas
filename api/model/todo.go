package model

import "time"

type Todo struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Status      string    `json:"status"`
	DtCreate    time.Time `json:"dtCreate"`
	DtChange    time.Time `json:"dtChange"`
}
