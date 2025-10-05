import pygame, sys
pygame.init()

# Window management
from ..__modules__.window import Window

# Screen configs
screen = pygame.display.set_mode((900, 500))
pygame.display.set_caption("Gemini Client")

# Gui components
from ..__modules__.jarvis_gui import *
Window = Window(screen)

# Global variables
colors = {
    "bg": (25, 26, 28),
    "text": (215, 215, 235)
}





def main():
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                Window.close()


        # Draw views
        Window.draw(colors["bg"])

        # Text
        Label(screen, "Hello World", colors["text"])

        # Updates views
        Window.update()


if __name__ == "__main__":
    main()