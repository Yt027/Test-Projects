import pygame, sys
from random import randint
pygame.init()

# Screen values
screen_w = 1200
screen_h = 900
screen_size = (screen_w, screen_h)

# Screen creation
screen = pygame.display.set_mode(screen_size)
pygame.display.set_caption('Space Shooter')



class App:
    def __init__(self, fps=30):
        self.fps = fps
        self.Clock = pygame.time.Clock()

    def background(self):
        screen.fill((212, 212, 212))

    def exit(self):
        pygame.quit()
        sys.exit()
        
    def refresh(self):
        self.Clock.tick(self.fps)
        pygame.display.update()

class Player:
    def __init__(self, name = 'Yaya'):
        self.name = name
        self.pos_x = screen_w / 2
        self.pos_y = screen_h / 2
        self.craft()
    
    def craft(self):
        



def main():
    APP = App()
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                App.exit()

        
        # Background
        APP.background()


        # Refresh
        APP.refresh()



if __name__ == '__main__':
    main()