import pygame
pygame.init()
pygame.display.init()
pygame.font.init()

class Font:
    def __init__(self, font=("Arial", 13)):
        # Set font to a correspondant sysfont if no path given
        self.font = pygame.font.SysFont(font[0], font[1])
        if "/" in font[0]:
            self.font = pygame.font.Font(font[0], font[1])

    def render(self, text=str, color=(255, 255, 255), background=None):
        return self.font.render(text, True, color, background)