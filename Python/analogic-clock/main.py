import pygame, datetime, sys, math
from ..__modules__.gui import Font
pygame.init()


screen = pygame.display.set_mode((600, 600))
pygame.display.set_caption("Clock")

# Variables
colors = {
    "bg": (5, 5, 5),
    "main": (100, 200, 250),
    "text": (255, 255, 255),
    "red": (255, 50, 50)
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

        # Clock Border
        pygame.draw.circle(screen, colors["main"], screen.get_rect().center, 230, 2)
        for i in range(12):
            angle = int(i * (360 / 12))
            pygame.draw.arc(screen, colors["main"], (100, 100, 400, 400), math.radians(angle - 1), math.radians(angle + 1), 3)

        # Clock Hands
        # Hour
        hour = datetime.datetime.now().hour % 12
        hour = 5
        angle = int(hour * 360 / 12) + 90 - (hour * 60)
        pygame.draw.arc(screen, colors["main"], (240, 240, 120, 120), math.radians(angle - 1), math.radians(angle + 1), 100)

        # Minute
        second = datetime.datetime.now().minute
        angle = -(int(second * 360 / 60) - 90)
        print(second)
        pygame.draw.arc(screen, colors["main"], (200, 200, 200, 200), math.radians(angle - 1), math.radians(angle + 1), 100)

        # Second
        second = datetime.datetime.now().second
        angle = -(int(second * 360 / 60) - 90)
        print(second)
        pygame.draw.arc(screen, colors["red"], (130, 130, 340, 340), math.radians(angle - 1), math.radians(angle + 1), 170)


        # Update screen
        pygame.time.Clock().tick(15)
        pygame.display.update()
        



if __name__ == "__main__":
    main()