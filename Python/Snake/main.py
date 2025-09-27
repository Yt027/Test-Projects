from random import random
import pygame, sys
pygame.init()


# Global Variables
screen = pygame.display.set_mode((600, 500))
pygame.display.set_caption("Snake.py")
bloc = 20
score = 0
game_over = False

def generatePos():
    return {
            "x": (int(random() * (screen.get_size()[0]/20)) * 20),
            "y": (int(random() * (screen.get_size()[1]/20)) * 20)
        }


def main():
    global score, bloc, screen, game_over
    game_over = True
    # Variables    
    snake = [
            {
                "x": 0,
                "y": 0
            }
        ]
    food = generatePos()

    direction = ""
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            
            if event.type == pygame.KEYDOWN:
                # Manage Direction changes
                if event.key == pygame.K_RIGHT and direction != "l" and not game_over:
                    direction = "r"
                elif event.key == pygame.K_LEFT and direction != "r" and not game_over:
                    direction = "l"
                elif event.key == pygame.K_DOWN and direction != "u" and not game_over:
                    direction = "d"
                elif event.key == pygame.K_UP and direction != "d" and not game_over:
                    direction = "u"
                
                if event.key == pygame.K_SPACE:
                    if game_over:
                        snake = [generatePos()]
                        food = generatePos()
                        score = 0
                        game_over = False

        # Moving Snake's head to direction
        head = snake[0]
        headX = head["x"]
        headY = head["y"]

        if direction == "r":
            headX += bloc
        elif direction == "l":
            headX -= bloc
        elif direction == "u":
            headY -= bloc
        elif direction == "d":
            headY += bloc
        
        head = {
                "x": headX,
                "y": headY
            }

        # Update snake with new head
        snake.remove(snake[len(snake) - 1])
        snake.reverse()
        snake.append(head)
        snake.reverse()

        # Draw everything
        screen.fill((0, 0, 0))
        # Snake
        for i in range(len(snake)):
            segment = snake[i]
            segment_rect = pygame.Rect(segment["x"], segment["y"], bloc, bloc)
            color = (75, 155, 0)

            # Manage Head diferently
            if i == 0:
                color = (0, 255, 0)
                if segment["x"] == food["x"] and segment["y"] == food["y"]:
                    snake.reverse()
                    snake.append(food)
                    snake.reverse()
                    food = generatePos()
                    score += 1
                    pygame.display.set_caption(f"Snake.py | Score: {score}")
            
            pygame.draw.rect(screen, color, segment_rect)

        # Food
        food_rect = pygame.Rect(food["x"], food["y"], bloc, bloc)
        pygame.draw.rect(screen, (255, 255, 0), food_rect)

        # Game Over conditions
        if game_over:
            direction = ""

        # Updating screen
        pygame.time.Clock().tick(6)
        pygame.display.flip()


if __name__ == "__main__":
    main()