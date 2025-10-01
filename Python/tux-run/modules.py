import pygame
from variables import *
# Classes for game modules

class Window:
    def draw():
        global screen
        screen.fill(COLORS["background"])

    def update():
        MAIN_CLOCK.tick(FPS)
        GAME["real_fps"] = MAIN_CLOCK.get_fps()
        if GAME["real_fps"] == 0: GAME["real_fps"] = 10 # Avoid division by zero
        GAME["DELTA"] = 1/GAME["real_fps"]
        pygame.display.update()

    def close():
        pygame.quit()
        sys.exit()