import pygame, sys
from random import randint
pygame.init()

screen_size = (900, 500)
screen = pygame.display.set_mode(screen_size)

bloc = 20


class game:
    def quit():
        pygame.quit()
        sys.exit()

    
    def update():
        pygame.display.flip()
        pygame.time.Clock().tick(5)


    def add_food():
        sw = screen_size[0]
        sh = screen_size[1]

        x = bloc * randint(
            0, 
            int(sw / bloc) - 1
        )

        y = bloc * randint(
            0, 
            int(sh / bloc) - 1
        )

        return (x, y, bloc, bloc)






def main():
    player = [
        game.add_food()
    ]

    food = game.add_food()

    direction = ""

    while True:
        # Event catcher
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game.quit()

            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    game.quit()

        # Moving player
                if event.key == pygame.K_UP:
                    direction = "u"
                if event.key == pygame.K_DOWN:
                    direction = "d"
                if event.key == pygame.K_LEFT:
                    direction = "l"
                if event.key == pygame.K_RIGHT:
                    direction = "r"
        
        if direction != "":
            head = player[0]
            headX = head[0]
            headY = head[1]
            
            if direction == "u":
                headY -= bloc
            if direction == "d":
                headY += bloc
            if direction == "l":
                headX -= bloc
            if direction == "r":
                headX += bloc

            newHead = (
                headX,
                headY, 
                bloc, 
                bloc
            )

            player.insert(0, newHead)

            if not pygame.Rect(newHead).colliderect(food): 
                player.remove(player[len(player) - 1])
            else: 
                food = game.add_food()


        # Screen display
        screen.fill((222, 222, 222))


        # Draw player
        for i in range(len(player)):
            part = player[i]
            color = (100, 100, 100) if i != 0 else (255, 0, 0)

            pygame.draw.rect(screen, color, part)

        # Draw food
        pygame.draw.rect(screen, (200, 200, 0), food, 5, 10)

        game.update()





if __name__ == "__main__":
    main()