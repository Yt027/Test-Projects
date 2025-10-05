import pygame, sys
pygame.init()


class Window:
    def __init__(self, surface):
        self.surface = surface
        self.clock = pygame.time.Clock()
    
    def draw(self, color=(0, 0, 100)):
        # Draw background
        self.surface.fill(color)

    def update(self, fps=30):
        # Update screen and apply a 30FPS
        self.clock.tick(fps)
        pygame.display.update()
    
    def get_fps(self):
        # Return framerate
        return self.clock.get_fps()
    
    def get_delta_time(self):
        # Return the time delay after last image
        return 1/self.get_fps()

    def close(self):
        # Close window and quit application
        pygame.quit()
        sys.exit()