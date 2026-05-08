import pygame, sys
pygame.init()

screen = pygame.display.set_mode((800, 500))
pygame.display.set_caption('Hello World')
clock = pygame.time.Clock()


FPS = 70
FPS_Delta = 1/FPS
mx, my = 0, 0
direction = 'dr'
real_velocity = 500
velocity = 15

ballx = 400
bally = 0
ball_size = 10

borders = {
    'top': pygame.Rect(0, 0, screen.get_width(), 1),
    'bottom': pygame.Rect(0, screen.get_height(), screen.get_width(), 1),
    'left': pygame.Rect(0, 0, screen.get_height(), 1),
    'right': pygame.Rect(screen.get_width(), 0, screen.get_height(), 1)
}


def exit():
    pygame.quit()
    sys.exit()

def update():
    global FPS_Delta, clock, FPS

    dt_ms = clock.tick(FPS)
    FPS_Delta = dt_ms / 1000.0


    pygame.display.update()


def move():
    global ballx, bally, velocity, direction

    # Move
    if 'u' in direction:
        bally -= velocity
    if 'd' in direction:
        bally += velocity
    if 'l' in direction:
        ballx -= velocity
    if 'r' in direction:
        ballx += velocity


    # Hit & Bounce
    for border in borders:
        if pygame.Rect(ballx, bally, ball_size, ball_size).colliderect(borders[border]):
            # Reverse direction
            new_direction = ''

            # Horizontal
            if border in ['top', 'bottom']:
                if 'u' in direction:
                    new_direction += 'd'
                if 'd' in direction:
                    new_direction += 'u'

                if 'l' in direction:
                    new_direction += 'l'
                if 'r' in direction:
                    new_direction += 'r'
                
            # Vertical
            if border in ['left', 'right']:
                if 'l' in direction:
                    new_direction += 'r'
                if 'r' in direction:
                    new_direction += 'l'

                if 'u' in direction:
                    new_direction += 'u'
                if 'd' in direction:                    
                    new_direction += 'd'

            direction = new_direction


    ballx = ball_size if ballx < 0 else screen.get_width() - ball_size if ballx > screen.get_width() else ballx
    bally = ball_size if bally < 0 else screen.get_height() - ball_size if bally > screen.get_height() else bally

def main():
    global velocity
    while True:
        # Get mouse position
        mx, my = pygame.mouse.get_pos()

        # Getting accurate velocity
        velocity = real_velocity * FPS_Delta
        # print(FPS_Delta)

        
        # Event Handler
        for event in pygame.event.get():
            # Exiing
            if event.type == pygame.QUIT:
                exit()

            if event.type == pygame.KEYDOWN:
                # Exiing
                if event.key == pygame.K_ESCAPE:
                    exit()
                
                #
            
            

        
        # Handling screen display
        screen.fill((255, 255, 255))

        # Drawing borders
        for border in borders:
            pygame.draw.rect(screen, (100, 100, 255), borders[border])

        # Drawing ball
        pygame.draw.circle(screen, (255, 100, 100), (ballx, bally), ball_size)

        # Move
        move()

        # Updating screen
        update()

if __name__ == '__main__':
    main()