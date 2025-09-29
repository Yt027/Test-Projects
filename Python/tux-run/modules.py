from variables import *
# Classes for game modules

class Window:
    def draw():
        global screen
        screen.fill(COLORS["background"])

    def update():
        global FPS, DELTA, MAIN_CLOCK
        MAIN_CLOCK.tick(FPS)
        FPS = MAIN_CLOCK.get_fps()
        DELTA = 1/FPS if FPS > 0 else 0
        pygame.display.flip()

    def close():
        pygame.quit()
        sys.exit()