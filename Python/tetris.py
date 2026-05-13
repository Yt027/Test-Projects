import pygame, sys
from random import randint
pygame.init()

# Screen configurations
screen_size = (600, 600)
screen = pygame.display.set_mode(screen_size)
pygame.display.set_caption('Tetris')


# Tetris figures
figures = [
    (
        [
            '* * * *'
        ],
        [
            '*',
            '*',
            '*',
            '*',
        ],
    ),
    (
        [
            '* * *',
            ', * ,'
        ],
        [
            ', * ,',
            '* * *'
        ],
        [
            '* ,',
            '* *',
            '* ,'
        ],
        [
            ', *',
            '* *',
            ', *'
        ],
    ),
    [
        '* *',
        '* *'
    ],
    (
        [
            '*',
            '* * *'
        ],
        [
            '* *',
            '*',
            '*'
        ],
        [
            '* * *',
            ', , *'
        ],
        [
            '*',
            '*',
            '* *'
        ],
    )
]

ground = [
    pygame.Rect(
        0,
        screen_size[1] - 10,
        screen_size[0],
        10
    )
]

bloc_size = 50



class Bloc:
    def __init__(self, rects, color, n, siblings):
        self.rects = rects
        self.color = color

        self.fig_pos = n
        self.has_siblings = siblings
        pass

    def collide_ground(self):
        smart_ground = ground
        smart_ground.reverse()

        for g in smart_ground:
            for rect in self.rects:
                if g.colliderect(rect):
                    return True
            
        return False

    def insert_to_ground(self):
        for part in self.rects:
            ground.append(part)
    
    def switch_sibling(self):
        print('siblings')

        actual_sub_pos = self.has_siblings

        if actual_sub_pos < len(figures[self.fig_pos]) -1:
            sibling_pos = actual_sub_pos + 1
        else: sibling_pos = 0

        new_bloc = game.generate_bloc(self.fig_pos, bloc_size, sibling_pos)
        self.rects = new_bloc.rects
        self.has_siblings = sibling_pos

        print(self.has_siblings)


class game:
    def exit():
        # Quit the game
        pygame.quit()
        sys.exit()
    
    def background():
        # Draw the background color
        screen.fill((222, 222, 222))
        game.draw_ground()

    def update():
        # Refresh the screen content
        pygame.time.Clock().tick(20)
        pygame.display.update()

    def build_pos(fig):
        # Transform tetris string figures into int coordinates
        positions = []

        for y in range(len(fig)):
            line = fig[y]
            list_line = line.split()

            for x in range(len(list_line)):
                if list_line[x] == '*': positions.append((x, y))
        
        return positions
    
    def generate_bloc(fig = None, bloc_size = bloc_size, sub_fig = None, accurate_pos=None):
        # Create a list of rectangles from random tetris figure using game.build_pos to get int coordinates
        if not fig: fig = randint(0, len(figures) - 1)
        n = fig

        fig = figures[fig]
        if type(fig) == tuple:
            if sub_fig == None: sub_fig = randint(0, len(fig) - 1)
            fig = fig[sub_fig]
        
        pos = game.build_pos(fig)

        blocs = []
        for (x, y) in pos:
            blocs.append(
                pygame.Rect((x * bloc_size) + 100, (y * bloc_size), bloc_size, bloc_size)
            )
        
        bloc_color = (
            randint(0, 255),
            randint(0, 255),
            randint(0, 255)
        )

        return Bloc(blocs, bloc_color, n, sub_fig)
    
    def move_bloc(bloc, x, y):
        # Move every rectangles in bloc object by increasing its x or y value by given x and y
        rects = bloc.rects

        for part in rects:
            part[0] += x
            part[1] += y
        
        bloc.rects = rects
        return bloc

    
    def draw_bloc(bloc):
        # Display bloc objects in screen by drawing every single rect
        rects = bloc.rects
        color = bloc.color
        for part in rects:
            pygame.draw.rect(
                screen, color, part
            )

    def draw_ground():
        for part in ground:
            pygame.draw.rect(screen, (100, 100, 100), part)


def main():
    actual_bloc = game.generate_bloc(1)
    print(actual_bloc.has_siblings)


    while True:
        # Handling events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game.exit()
            
        # Move the actual bloc horizontally
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    game.move_bloc(actual_bloc, -bloc_size, 0)
                if event.key == pygame.K_RIGHT:
                    game.move_bloc(actual_bloc, bloc_size, 0)
                
                if event.key == pygame.K_SPACE and actual_bloc.has_siblings != None:
                    actual_bloc.switch_sibling()





        # Drawing background
        game.background()

        game.draw_bloc(actual_bloc)
        if not actual_bloc.collide_ground():
            game.move_bloc(actual_bloc, 0, 5)
        else:
            actual_bloc.insert_to_ground()
            actual_bloc = game.generate_bloc()

        # Refreshing the screen
        game.update()



if __name__ == '__main__':
    main()