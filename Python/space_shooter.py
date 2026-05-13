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

# Variables
bloc_size = 20



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
    
    def build_bloc(self, figure, pos=(0, 0), bloc = 20, accept = '*'):
        pos_x, pos_y = pos
        rectangles = []

        for y in range(len(figure)):
            line = figure[y].split()
            print(line)
            for x in range(len(line)):
                char = line[x]
                if char == accept:
                    rectangles.append((
                        pos_x + (x * bloc), 
                        pos_y + (y * bloc), 
                        bloc,
                        bloc
                    ))

        return rectangles
    
    def draw_blocs(self, blocs, color = (0, 0, 25)):
        for part in blocs:
            pygame.draw.rect(screen, color, part)
        


class Player:
    def __init__(self, name = 'Yaya', bloc = bloc_size):
        self.name = name
        self.pos_x = screen_w / 2
        self.pos_y = screen_h / 2
        self.bloc = bloc
        self.craft()
    
    def craft(self):
        self.figure = [
            '- - * - -',
            '* * * * *',
            '- * * * -'
        ]
    
    def x_center(self):
        width = 0
        for line in self.figure:
            line = line.split()
            if len(line) > width: width = len(line)
        
        width *= self.bloc

        return self.pos_x + (width / 2)


class Enemy:
    def __init__(self, velocity = 0.3, bloc = bloc_size):
        self.pos_y = 10
        self.pos_x = randint(0, int(screen_w / bloc_size) - 1) * bloc_size
        self.bloc = bloc
        self.velocity = velocity

        self.craft()

    def craft(self):
        self.figure = [
            '* * * * *',
            '- * * * -',
            '- - * - -'
        ]
    
    def x_center(self):
        width = 0
        for line in self.figure:
            line = line.split()
            if len(line) > width: width = len(line)
        
        width *= self.bloc
        self.width = width

        return self.pos_x + (width / 2)
    
    def update(self, player_center, player_bloc):
        center = self.x_center()

        if center < player_center - player_bloc:
            center += (self.bloc * self.velocity)
        elif center > player_center + player_bloc:
            center -= (self.bloc * self.velocity)

        self.pos_x = center - (self.width / 2)


def main():
    APP = App()
    player = Player()

    enemy = Enemy()


    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                App.exit()
        
        # Moving player
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            player.pos_x -= player.bloc
        if keys[pygame.K_RIGHT]:
            player.pos_x += player.bloc

        if keys[pygame.K_UP]:
            player.pos_y -= player.bloc
        if keys[pygame.K_DOWN]:
            player.pos_y += player.bloc

        
        # Background
        APP.background()

        # Draw player
        player_blocs = APP.build_bloc(player.figure, (player.pos_x, player.pos_y))
        APP.draw_blocs(player_blocs)

        # Draw enemy
        enemy_blocs = APP.build_bloc(enemy.figure, (enemy.pos_x, enemy.pos_y))
        APP.draw_blocs(enemy_blocs)
        enemy.update(player.x_center(), player.bloc)


        # Refresh
        APP.refresh()



if __name__ == '__main__':
    main()