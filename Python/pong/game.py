import pygame, sys, math
pygame.init()

# Screen variables
screen_w = 1200
screen_h = 900
screen_size = (screen_w, screen_h)

screen = pygame.display.set_mode(screen_size, pygame.RESIZABLE)
pygame.display.set_caption('Pong')

Clock = pygame.time.Clock()
FPS = 60

# Variables
left_wall = pygame.Rect(-100, 0, 100, screen_h)
right_wall = pygame.Rect(screen_w, 0, 100, screen_h)
top_wall = pygame.Rect(0, -100, screen_w, 100)
bottom_wall = pygame.Rect(0, screen_h, screen_w, 100)

bloc_size = 20

player_score = 0
computer_score = 0



class Game:
    def __init__(self):
        pass

    def exit(self):
        pygame.quit()
        sys.exit()

    def background(self):
        screen.fill((40, 40 , 65))
        pygame.draw.line(screen, (212, 212, 212), (screen_w / 2 - 1, 0), (screen_w / 2 - 1, screen_h), 2)
    
    def update_walls(self):
        global left_wall, right_wall, top_wall, bottom_wall

        left_wall = pygame.Rect(-100, 0, 100, screen_h)
        right_wall = pygame.Rect(screen_w, 0, 100, screen_h)
        top_wall = pygame.Rect(0, -100, screen_w, 100)
        bottom_wall = pygame.Rect(0, screen_h, screen_w, 100)

    def update(self):
        Clock.tick(FPS)
        pygame.display.update()

    def label(self, text, pos = (0, 0), font_size = 24, color = (212, 212, 21), bold = False):
        font = pygame.font.SysFont('Poppins', font_size, bold)
        rendering = font.render(text, True, color)

        screen.blit(rendering, pos)

class Ball:
    def __init__(self, velocity = (1, 1), init_pos = None):
        if not init_pos: init_pos = (screen_w/2, screen_h/2)

        self.x, self.y = init_pos
        self.vx, self.vy = velocity
        self.svx, self.svy = velocity

        self.rect = pygame.Rect(self.x, self.y, 20, 20)

    def draw(self):
        pygame.draw.rect(screen, (200, 30, 30), self.rect, 0, 30)
    
    def y_center(self):
        return self.y + (self.rect.height / 2)

    def update(self, watch_list):
        global left_wall, right_wall, top_wall, bottom_wall, player_score, computer_score
        self.x += self.vx
        self.y += self.vy

        if abs(self.vx) > abs(self.svx):
            if self.vx < 0:
                self.vx += 0.1
            elif self.vx > 0:
                self.vx -= 0.1

        if abs(self.vy) > abs(self.svy):
            if self.vy < 0:
                self.vy += 0.1
            elif self.vy > 0:
                self.vy -= 0.1

        print(f"X: {self.vx}, Y: {self.vy}")

        # Bouncing factor
        bounce = 2

        if self.rect.colliderect(top_wall):
            self.vy = (self.svy * bounce)
        if self.rect.colliderect(bottom_wall):
            self.vy = -(self.svy * bounce)

        if self.rect.colliderect(right_wall):
            self.vx = -(self.svx * bounce)
            player_score += 0.5
        if self.rect.colliderect(left_wall):
            self.vx = (self.svx * bounce)
            computer_score += 0.5

        # Watch the watch list
        for obstacle in watch_list:
            rectangle = obstacle.rectangle
            if self.rect.colliderect(rectangle):
                y_velocity_factor = obstacle.y_factor

                # Handle x velocity
                if self.x < rectangle.x:
                    self.vx = -(self.svx * bounce)
                if self.x > rectangle.x:
                    self.vx = (self.svx * bounce)

                # Handle y velocity
                if y_velocity_factor != 0:
                    self.vy = y_velocity_factor * (self.svy * bounce)


        
        self.rect = pygame.Rect(self.x, self.y, 20, 20)



class Paddle:
    def __init__(self, pos):
        self.pos_x, self.pos_y = pos
        self.y_factor = 0
        self.craft()

    def craft(self):
        self.rectangle = pygame.Rect(self.pos_x, self.pos_y, bloc_size, 200)

    def draw(self):
        self.y_factor = 0
        pygame.draw.rect(screen, (200, 200, 200), self.rectangle, 0, 5)

    def move_up(self, y_velocity = 1):
        if self.pos_y > 0: self.pos_y -= (bloc_size * y_velocity)
        self.y_factor = -1
        self.craft()

    def move_down(self, y_velocity = 1):
        if self.pos_y + self.rectangle.height < screen_h: self.pos_y += (bloc_size * y_velocity)
        self.y_factor = 1
        self.craft()
    
    def y_center(self):
        return int(self.pos_y + (self.rectangle.height / 2))
    
    def auto_move(self, point_y, move_now = False, y_velocity = 0.3):
        if move_now:
            center = self.y_center()
            if point_y < center - bloc_size:
                self.move_up(y_velocity)
            if point_y > center + bloc_size:
                self.move_down(y_velocity)


def main():
    global screen_w, screen_h, screen_size

    ball = Ball((7.5, 7.5))
    game = Game()
    player = Paddle((0, bloc_size))
    enemy = Paddle((screen_w - bloc_size, bloc_size))

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game.exit()
            
            if event.type == pygame.WINDOWRESIZED:
                screen_w = screen.get_width()
                screen_h = screen.get_height()
                screen_size = (screen_w, screen_h)

                enemy = Paddle((screen_w - bloc_size - 5, bloc_size))
                game.update_walls()
        
        # Moving player
        keys = pygame.key.get_pressed()
        if keys[pygame.K_UP]:
            player.move_up()
        if keys[pygame.K_DOWN]:
            player.move_down()

        # Background
        game.background()

        # Update & Draw ball
        ball.update(
            [
                player,
                enemy
            ]
        )
        ball.draw()

        # Draw player
        player.draw()

        # Draw enemy
        enemy.draw()
        enemy.auto_move(ball.y_center(), ball.vx > 0 and ball.x > screen_w / 2)

        # Score
        # Board
        pygame.draw.rect(screen, (50, 50 , 75), (screen_w / 2 - 100, 10, 200, 150), 0, 10)
        # Player
        game.label(str(int(player_score)), (screen_w / 2 - 85, 61), color=(75, 75, 212), font_size=61)
        # Enemy
        game.label(str(int(computer_score)), (screen_w / 2 + 40, 61), color=(212, 75, 75), font_size=61)

        # Refresh
        game.update()



if __name__ == '__main__':
    main()