import pygame
from variables import *
# Classes for game modules

class Window:
    def draw():
        global screen
        screen.fill(COLORS["background"])

    def update():
        MAIN_CLOCK.tick(FPS)
        fps = MAIN_CLOCK.get_fps()
        if fps == 0: fps = 60 # Avoid division by zero
        GAME["DELTA"] = 1/fps
        pygame.display.update()

    def close():
        pygame.quit()
        sys.exit()