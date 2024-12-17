package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Servir archivos estáticos (CSS, JS si fuera necesario)
	r.Static("/static", "./static")
	r.LoadHTMLFiles("templates/index.html")

	// Ruta para el HTML principal
	r.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", nil)
	})

	r.Run(":8080") // Ejecuta el servidor en el puerto 8080
}
