import pygame, sys
pygame.init()

screen_size = (800, 500)
screen = pygame.display.set_mode(screen_size)
pygame.display.set_caption('Pong')

Clock = pygame.time.Clock()
FPS = 60

# Walls
left_wall = pygame.Rect(0, 0, 1, screen_size[1])
right_wall = pygame.Rect(screen_size[0], 0, 1, screen_size[1])
top_wall = pygame.Rect(0, 0, screen_size[0], 1)
bottom_wall = pygame.Rect(0, screen_size[1], screen_size[0], 1)



class Game:
    def __init__(self):
        pass

    def exit(self):
        pygame.quit()
        sys.exit()

    def background(self):
        screen.fill((40, 40 , 65))

    def update(self):
        Clock.tick(FPS)
        pygame.display.update()

class Ball:
    def __init__(self, velocity = (1, 2), init_pos = None):
        if not init_pos: init_pos = (screen_size[0]/2, screen_size[1]/2)

        self.x, self.y = init_pos
        self.vx, self.vy = velocity
        self.svx, self.svy = velocity

        self.rect = pygame.Rect(self.x, self.y, 20, 20)

    def draw(self):
        pygame.draw.rect(screen, (200, 30, 30), self.rect, 0, 30)

    def update(self, watch_list):
        self.x += self.vx
        self.y += self.vy

        print(f"X: {self.x}, Y: {self.y}")

        for obstacle in watch_list:
            if self.rect.x < obstacle[0]:
                self.vx = -(self.svx * 1)

            if self.rect.x > obstacle[0]:
                self.vx = (self.svx * 1)


            if self.rect.y < obstacle[1]:
                self.vy = -(self.svy * 1)

            if self.rect.y > obstacle[1]:
                self.vy = (self.svy * 1)
        
        self.rect = pygame.Rect(self.x, self.y, 20, 20)




def main():
    ball = Ball()
    game = Game()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game.exit()


        # Background
        game.background()

        # Update ball
        ball.update(
            [
                left_wall,
                right_wall,
                top_wall, 
                bottom_wall
            ]
        )
        ball.draw()

        # Refresh
        game.update()



if __name__ == '__main__':
    main()