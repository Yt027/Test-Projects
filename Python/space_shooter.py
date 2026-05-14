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
bloc_size = 25



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

    def label(self, text, pos=(0, 0), font_size = 18, color = (0, 0, 25)):
        font = pygame.font.SysFont('Poppins', font_size)
        rendering = font.render(text, True, color)
        
        screen.blit(rendering, pos)
    
    def build_bloc(self, figure, pos=(0, 0), bloc = bloc_size, accept = '*'):
        pos_x, pos_y = pos
        rectangles = []

        for y in range(len(figure)):
            line = figure[y].split()
            print(line)
            for x in range(len(line)):
                char = line[x]
                if char == accept:
                    rectangles.append(pygame.Rect(
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
        self.bullet_velocity = -30
        self.health = 100
        self.damage = 1
        self.rectangles = []

        self.bullets = []

        self.craft()
    
    def craft(self):
        self.figure = [
            '- - * - -',
            '- * * * -',
            '* - * - *'
        ]
        
        self.height = len(self.figure) * self.bloc
        self.x_center()
    
    def x_center(self):
        width = 0
        for line in self.figure:
            line = line.split()
            if len(line) > width: width = len(line)
        
        width *= self.bloc
        self.width = width

        return self.pos_x + (width / 2)

    def update(self, enemy):
        # Updating/Drawing bullets
        updated_bullets = []
        for pos in self.bullets:
            pygame.draw.circle(screen, (50, 50, 240), pos, 5)
            
            if pos[1] < screen_h: updated_bullets.append((pos[0], pos[1] + self.bullet_velocity))
        
        self.bullets = updated_bullets

        # Getting damages from enemy
        for rectangle in self.rectangles:
            enemy_bullets = []
            for pos in enemy.bullets:
                if rectangle.collidepoint(pos):
                    self.health -= enemy.damage
                else:
                    enemy_bullets.append(pos)
            enemy.bullets = enemy_bullets
                
    
    def shoot(self, percent = 10):
        if randint(0, 100) <= percent:
            self.bullets.append((self.x_center(), self.pos_y - self.bloc))


class Enemy:
    def __init__(self, velocity = 0.3, bloc = bloc_size):
        self.pos_y = 10
        self.pos_x = randint(0, int(screen_w / bloc_size) - 1) * bloc_size
        self.bloc = bloc
        self.velocity = velocity
        self.bullet_velocity = 30
        self.health = 100
        self.damage = 1
        self.rectangles = []

        self.bullets = []

        self.craft()

    def craft(self):
        self.figure = [
            '- * - * * * - * -',
            '* * * * * * * * *',
            '- - * * * * * - -',
            '- - - * * * - - -',
            '- - - - * - - - -'
        ]

        self.height = len(self.figure * self.bloc)
        self.x_center()
    
    def x_center(self):
        width = 0
        for line in self.figure:
            line = line.split()
            if len(line) > width: width = len(line)
        
        width *= self.bloc
        self.width = width

        return self.pos_x + (width / 2)
    
    def update(self, player):
        player_center = player.x_center()
        player_bloc = player.bloc

        print(self.health)

        # Updating/Drawing bullets
        updated_bullets = []
        for pos in self.bullets:
            pygame.draw.circle(screen, (240, 50, 50), pos, 5)
            
            if pos[1] < screen_h: updated_bullets.append((pos[0], pos[1] + self.bullet_velocity))
        
        self.bullets = updated_bullets

        # Aiming the player
        center = self.x_center()

        if center < player_center - player_bloc:
            center += (self.bloc * self.velocity)
        elif center > player_center + player_bloc:
            center -= (self.bloc * self.velocity)
        
        if center > player_center - player.width and center < player_center + player.width:
            self.shoot()

        self.pos_x = center - (self.width / 2)

        # Getting damages from player
        for rectangle in self.rectangles:
            player_bullets = []
            for pos in player.bullets:
                if rectangle.collidepoint(pos):
                    self.health -= player.damage
                else:
                    player_bullets.append(pos)
            player.bullets = player_bullets
    
    def shoot(self, percent = 10):
        if randint(0, 100) <= percent:
            self.bullets.append((self.x_center(), self.pos_y + self.height + self.bloc))


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
        
        if keys[pygame.K_SPACE]:
            player.shoot(50)

        
        # Background
        APP.background()

        # Draw player
        player.rectangles = APP.build_bloc(player.figure, (player.pos_x, player.pos_y))
        APP.draw_blocs(player.rectangles)
        player.update(enemy)

        # Draw enemy
        enemy.rectangles = APP.build_bloc(enemy.figure, (enemy.pos_x, enemy.pos_y))
        APP.draw_blocs(enemy.rectangles)
        enemy.update(player)


        # Enemy health
        APP.label(f"Health: {enemy.health}", (screen_w - 100, 10), 24, (240, 50, 50))

        # Player health
        APP.label(f"Health: {player.health}", (screen_w - 100, 35), 24, (50, 50, 240))


        # Refresh
        APP.refresh()



if __name__ == '__main__':
    main()