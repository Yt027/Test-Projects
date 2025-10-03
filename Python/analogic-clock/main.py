import pygame, datetime, sys
from ..__modules__.gui import Font
pygame.init()


screen = pygame.display.set_mode((600, 600))
pygame.display.set_caption("Clock")

# Variables
colors = {
    "bg": (5, 5, 5),
    "main": (100, 200, 250),
    "text": (255, 255, 255)
}



def main():
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

    
        # Draw everyting
        # Screen
        screen.fill(colors["bg"])

        # Update screen
        pygame.time.Clock().tick(15)
        pygame.display.update()




if __name__ == "__main__":
    main()