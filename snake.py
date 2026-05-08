import pygame, sys
from random import randint
pygame.init()

screen_size = (900, 500)
screen = pygame.display.set_mode(screen_size, pygame.RESIZABLE)
pygame.display.set_caption('Snake')

base_fps = 15
bloc_size = 20
score = 0



class game:
    def generatePos():
        global screen_size
        w = screen_size[0]
        h = screen_size[1]

        x = randint(0, int(w / bloc_size) - 2) * bloc_size
        y = randint(0, int(h / bloc_size) - 2) * bloc_size

        if x > w - bloc_size: x = w - bloc_size
        if y > h - bloc_size: y = h - bloc_size

        return {
            'x': x,
            'y': y
        }
    
    def drawBloc(bloc, color=(0, 0, 0)):
        if not bloc['x'] or not bloc['y']: return

        pygame.draw.rect(screen, color, (bloc['x'], bloc['y'], bloc_size, bloc_size), 0, 10)


    def background():
        screen.fill((222, 222, 222))

    def update():
        global score, base_fps

        pygame.display.update()
        pygame.time.Clock().tick(base_fps + (score * 0.2))

    def exit():
        pygame.quit()
        sys.quit()


def main():
    global screen_size, score, base_fps

    player = [
        game.generatePos()
    ]
    food = game.generatePos()
    direction = ''

    while True:
        # Scoring
        score = len(player) - 1

        # Moose position
        mX, mY = pygame.mouse.get_pos()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game.exit()
            
            if event.type == pygame.WINDOWRESIZED:
                screen_size = screen.get_size()
            
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    direction = 'l'
                if event.key == pygame.K_RIGHT:
                    direction = 'r'
                if event.key == pygame.K_UP:
                    direction = 'u'
                if event.key == pygame.K_DOWN:
                    direction = 'd'
                
                if event.key == pygame.K_m:
                    if direction != 'mouse': 
                        direction = 'mouse'
                        base_fps = 10
                    else: 
                        direction = ''
                        base_fps = 15

                if event.key == pygame.K_a:
                    if direction != 'auto': 
                        direction = 'auto'
                        base_fps = 10
                    else: 
                        direction = ''
                        base_fps = 15

        # Applying direction
        head = player[0]
        headX = head['x']
        headY = head['y']

        # Keyboard direction
        if direction == 'l':
            headX -= bloc_size
        if direction == 'r':
            headX += bloc_size
        
        if direction == 'u':
            headY -= bloc_size
        if direction == 'd':
            headY += bloc_size

        # Mouse direction
        if direction == 'mouse':
            if headX > mX: headX -= bloc_size
            if headX < mX: headX += bloc_size

            if headY > mY: headY -= bloc_size
            if headY < mY: headY += bloc_size

        if direction == 'auto':
            foodX = food['x']
            foodY = food['y']

            if headX > foodX: headX -= bloc_size
            if headX < foodX: headX += bloc_size

            if headY > foodY: headY -= bloc_size
            if headY < foodY: headY += bloc_size

        newHead = {
            'x': headX,
            'y': headY
        }
    
        player.insert(0, newHead)
        if not (newHead['x'] == food['x'] and newHead['y'] == food['y']):
            player.remove(player[len(player) - 1])
        else:
            food = game.generatePos()
        
        # Screenplay
        game.background()

        # Draw food
        game.drawBloc(food, (200, 200, 20))

        # Draw player
        for bloc in player:
            game.drawBloc(bloc)

        game.update()




if __name__ == '__main__':
    main()