import pygame, sys
from gui_v1_1 import *
pygame.init()

screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Tic Tac Toe")

# Global variables
click = False
mx, my = 0, 0
chessboard = [False] * 9
selected_grid = False
players = [[], []]
pion_images = {
    "o": pygame.transform.scale(pygame.image.load("./assets/o.png"), (200, 200)),
    "x": pygame.transform.scale(pygame.image.load("./assets/x.png"), (200, 200))
}
board = pygame.Rect(600, 0, 600, 600)

Label = {
    "title": Font(("Arial", 28)),
    "normal": Font(("Arial", 13))
}

# Load grids
def load_grids():
    x, y =0, 0
    for i in range(9):
        if x >= 600: 
            x = 0
            y += 200
        chessboard[i] = (x, y, (200), (200))
        x += 200


def grid_move_laws(choosen, selected, d):
    if choosen in (1, 4, 7):
        if choosen == 4 and d in (2, 3, 4):
            return True
        else:
            if d <= 4 and selected in (1, 4, 7):
                return True
    else:
        if d <= 3 and not selected in (1, 4, 7):
            return True
        if selected == 4:
            return True
    return False


def won(player, players=players):
    win_combinations = [
        (0, 1, 2), (3, 4, 5), (6, 7, 8), # Horizontal
        (0, 3, 6), (1, 4, 7), (2, 5, 8), # Vertical
        (0, 4, 8), (2, 4, 6)               # Diagonal
    ]

    for combo in win_combinations:
        if all(pos in player for pos in combo):
            return players.index(player)
    return None


def main():
    global click, mx, my, chessboard, selected_grid, players, pion_images, board
    # Loading grids
    load_grids()
    # Alternate players
    play_turn = 0
    # Choose and move variable
    choosen_grid = None
    # Game winner
    Winner = None
    # Restart game button
    restart_button = TextButton("Restart Game", pos=(625, 550), font=("Arial", 20), color=(255, 255, 255), bg_color=(20, 120, 130), border_radius=-1, padding=(15, 10))
    while True:
        # print(play_turn + 1)
        # Setting Left click's default value
        click = False
        # Update mouse position
        mx, my = pygame.mouse.get_pos()
        # Removing grid selection
        selected_grid = None

        # Fetching user events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1:
                    # Updating Left click
                    click = True

        # Drawing everything
        screen.fill((255, 255, 255))

        # Drawing and managing Grids's click
        for z in range(len(chessboard)):
            grid = pygame.Rect(chessboard[z])
            pygame.draw.rect(screen, (0, 0, 0), grid, 1)

            # Checking selected grid
            if click and grid.collidepoint(mx, my) and Winner == None:
                selected_grid = z

        
        # Main Game Logic
        if selected_grid != None:
            # First 6 Truns
            if len(players[play_turn]) < 3:
                players[play_turn].append(selected_grid)
                Winner = won(players[play_turn])

                # Switching play turn
                if play_turn == 0:
                    play_turn = 1
                else: play_turn = 0
            # Moving pions
            else:
                if selected_grid in players[play_turn] and not choosen_grid:
                    choosen_grid = selected_grid

                if choosen_grid != None and not selected_grid in players[play_turn] and not selected_grid in players[abs(play_turn - 1)]:
                    grids = [choosen_grid, selected_grid]
                    d = abs(choosen_grid - selected_grid)
                    if d == 1 or grid_move_laws(choosen_grid, selected_grid, d):
                        players[play_turn][players[play_turn].index(choosen_grid)] = selected_grid
                        Winner = won(players[play_turn])
                        
                        # Switching play turn
                        if play_turn == 0:
                            play_turn = 1
                        else: play_turn = 0
                        choosen_grid = None
                else: 
                    if selected_grid in players[play_turn]:
                        choosen_grid = selected_grid

                

        # Drawing pions
        for i in range(len(players)):
            player = players[i]
            image = "o"
            if i == 1: image = "x"
            for grid in player:
                rect = chessboard[grid]
                screen.blit(pion_images[image], (rect[0], rect[1]))

                # Highlighting chosen grid
                if choosen_grid == grid:
                    pygame.draw.circle(screen, (255, 0, 0), (rect[0] + 20, rect[1] + 20), 5, 0)  
        
        # Drawind board area
        title = Label["title"].render("Tic Tac Toe", (0, 0, 0))
        screen.blit(title, (610, 20))

        for id in range(len(players)):
            player_text = f"{"O" if id == 0 else "X"} Player{" Winner!" if Winner == id else ""}"
            text_surface = Label["normal"].render(player_text, (0, 0, 0))
            screen.blit(text_surface, (620, 80 + id * 20))

            if play_turn == id:
                pygame.draw.circle(screen, (0, 255, 0), (610, 87 + id * 20), 5, 0)
        
        # Drawing restart button
        if players != [[], []]:
            restart_button.draw(screen)
            if click and restart_button.rect.collidepoint(mx, my):
                # Resetting game variables
                players = [[], []]
                play_turn = 0
                choosen_grid = None
                Winner = None


        # Updating screen
        pygame.time.Clock().tick(30)
        pygame.display.flip()



if __name__ == "__main__":
    main()