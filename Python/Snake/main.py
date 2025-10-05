from random import random
import pygame, sys, json
# Be sure to have gui.py imported
from ..__modules__.gui import Font
pygame.init()


# Global Variables
screen = pygame.display.set_mode((600, 500), pygame.RESIZABLE)
pygame.display.set_caption("Snake.py")
bloc = 20
score = 0
game_over = False
pause = False

# Fetching higth score
hight_score = 0
try:
    open("data.json", "r")
except:
    file = open("data.json", "a")
    file.write(r'{"snake": {"hight_score": 0}}')
    file.close()

with open("data.json", "r") as fp:
    hight_score = json.load(fp)["snake"]["hight_score"]
    print(hight_score)
        

fonts = {
    "title": Font(("Arial Bold", 34)),
    "text": Font(("Arial", 14)),
    "small_text": Font(("Arial", 12))
}

def generatePos():
    return {
            "x": (int(random() * ((screen.get_width()/bloc) - 1)) * bloc),
            "y": (int(random() * ((screen.get_height()/bloc) - 1)) * bloc)
        }


def main():
    global score, bloc, screen, game_over, pause, hight_score
    # Variables    
    snake = [generatePos()]
    food = generatePos()

    direction = ""
    last_direction = ""
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
                
                elif event.key == pygame.K_SPACE:
                    if game_over:
                        snake = [generatePos()]
                        food = generatePos()
                        score = 0
                        game_over = False
                    elif pause:
                        direction = last_direction
                        pause = False

                elif event.key == pygame.K_ESCAPE:
                    if not pause and not game_over:
                        last_direction = direction
                        pause = True
                    else:
                        quit() 
                        sys.exit()

        # Moving Snake's head to direction
        if not game_over and not pause:
            head = snake[0]
            headX = head["x"]
            headY = head["y"]

            if direction == "r":
                headX += bloc
                if headX == screen.get_width(): game_over = True

            elif direction == "l":
                headX -= bloc
                if headX == -bloc: game_over = True

            elif direction == "u":
                headY -= bloc
                if headY == -bloc: game_over = True

            elif direction == "d":
                headY += bloc
                if headY == screen.get_height(): game_over = True
            
            head = {
                    "x": headX,
                    "y": headY
                }

            # Update snake with new head
            snake.remove(snake[len(snake) - 1])
            snake[:] = [head] + snake

        # Draw everything
        screen.fill((0, 5, 10))
        # Snake
        for i in range(len(snake)):
            segment = snake[i]
            segment_rect = pygame.Rect(segment["x"], segment["y"], bloc, bloc)
            color = (75, 155, 0)

            # Manage Head diferently
            if i == 0:
                color = (0, 255, 0)
                if segment["x"] == food["x"] and segment["y"] == food["y"]:
                    snake[:] = [food] + snake
                    food = generatePos()
                    score += 1
                    pygame.display.set_caption(f"Snake.py | Score: {score}")
            
            # Game over when snake's head touch itself
            else:
                if i > 1 and segment["x"] == snake[0]["x"] and segment["y"] == snake[0]["y"]:
                    game_over = True
            
            pygame.draw.rect(screen, color, segment_rect, 0, 10)

        # Food
        food_rect = pygame.Rect(food["x"], food["y"], bloc, bloc)
        pygame.draw.rect(screen, (255, 255, 0), food_rect, 5, 10)

        # Game Over conditions
        if game_over or pause:
            # Stop the game
            direction = ""

            # Checking for new hight score and saving it
            if score > hight_score and not pause:
                hight_score = score
                with open("data.json", "w") as fp:
                    fp.writelines(json.dumps({"snake": {"hight_score": hight_score}}))
                    fp.close()
                    

            # Board
            game_over_board = pygame.Rect(0, 50, 350, 200)
            game_over_board.center = (screen.get_width() / 2, screen.get_height() / 2)
            pygame.draw.rect(screen, (55, 55, 65), game_over_board, 0, 10)

            # Game Over
            game_over_title = fonts["title"].render("Game Over", (0, 255, 0))
            if pause: game_over_title = fonts["title"].render("Pause", (0, 255, 0))
            game_over_title_rect = game_over_title.get_rect()
            game_over_title_rect.top = game_over_board.top + 10
            game_over_title_rect.centerx = game_over_board.centerx
            screen.blit(game_over_title, game_over_title_rect)

            # Score
            game_over_score = fonts["text"].render(f"Score: {score}", (230, 230, 230))
            game_over_score_rect = game_over_score.get_rect(left=game_over_board.x + 15, top=game_over_board.y + 100)
            screen.blit(game_over_score, game_over_score_rect)

            # Hight Score
            game_over_hight_score = fonts["text"].render(f"Meilleur Score: {hight_score}", (230, 230, 230))
            game_over_hight_score_rect = game_over_hight_score.get_rect(left=game_over_board.x + 15, top=game_over_board.y + 125)
            screen.blit(game_over_hight_score, game_over_hight_score_rect)

            # Restart
            game_over_restart = fonts["text"].render("Récommencer: [Espace]", (230, 230, 230))
            if pause: game_over_restart = fonts["text"].render("Continuer: [Espace]", (230, 230, 230))
            game_over_restart_rect = game_over_restart.get_rect(left=game_over_board.x + 15, top=game_over_board.y + 150)
            screen.blit(game_over_restart, game_over_restart_rect)

            # Menu
            game_over_hight_score = fonts["text"].render("Quitter: [Echap]", (230, 230, 230))
            game_over_hight_score_rect = game_over_hight_score.get_rect(left=game_over_board.x + 15, top=game_over_board.y + 175)
            screen.blit(game_over_hight_score, game_over_hight_score_rect)

        # Updating screen
        pygame.time.Clock().tick(6)
        pygame.display.flip()


if __name__ == "__main__":
    main()
