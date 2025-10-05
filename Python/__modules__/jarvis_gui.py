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
    
def Label(surface=pygame.surface, text=str, color=(255, 255, 255), font=("Arial", 13), pos=(0, 0), center=None, underline={"args": "bottom right", "color": (0, 0, 255), "border": 2, "padding": 3}):
    label = Font(font)
    label = label.render(text, color)

    # Options
    rect = label.get_rect(left=pos[0], top=pos[1])
    if center:
        rect = label.get_rect(center=center)
        pos = rect

    if underline and underline["args"]:
        args = underline["args"].lower()
        color = underline["color"]
        border = underline["border"]
        padding = underline["padding"]
        
        if "bottom" in args:
            pygame.draw.rect(surface, color, (rect.left, rect.bottom + padding, rect.width, border))

        if "right" in args:
            pygame.draw.rect(surface, color, (rect.right + padding, rect.top, border, rect.height))

    # Rendering on screen
    surface.blit(label, pos)

    return rect