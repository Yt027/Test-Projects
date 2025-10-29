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
    
class TextButton:
    def __init__(self, text, pos=(0, 0), font=("Arial", 13), color=(255, 255, 255), bg_color=(20, 100, 130), border_radius=-1, padding=(10, 5)):
        self.text = text
        self.pos = pos
        self.font = Font(font)
        self.color = color
        self.bg_color = bg_color
        self.border_radius = [border_radius] * 4 if type(border_radius) == int else border_radius
        self.padding = padding

        self.rendered_text = self.font.render(self.text, self.color)

        self.width = self.rendered_text.get_width() + self.padding[0] * 2
        self.height = self.rendered_text.get_height() + self.padding[1] * 2
        self.rect = pygame.Rect(self.pos[0], self.pos[1], self.width, self.height)

    def draw(self, surface):
        pygame.draw.rect(surface, self.bg_color, self.rect, 
            border_top_left_radius=self.border_radius[0], 
            border_top_right_radius=self.border_radius[1], 
            border_bottom_right_radius=self.border_radius[2], 
            border_bottom_left_radius=self.border_radius[3])
        
        surface.blit(self.rendered_text, (self.pos[0] + self.padding[0], self.pos[1] + self.padding[1]))