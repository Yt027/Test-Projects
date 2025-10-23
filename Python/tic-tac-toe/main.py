import pygame, sys, math
pygame.init()

screen = pygame.display.set_mode((600, 600))
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

# Load grids
def load_grids():
    x, y =0, 0
    for i in range(9):
        if x >= 600: 
            x = 0
            y += 200
        chessboard[i] = (x, y, (200), (200))
        x += 200


def check_vertical_move(choosen, selected, d):
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
        if choosen == 0 and selected == 3:
            return True
    return False



def main():
    # Loading grids
    load_grids()
    # Alternate players
    play_turn = 0
    # Choose and move variable
    choosen_grid = None
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
            if click and grid.collidepoint(mx, my):
                selected_grid = z

        
        # Main Game Logic
        if selected_grid != None:
            # First 6 Truns
            if len(players[play_turn]) < 3:
                players[play_turn].append(selected_grid)

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
                    if d == 1 or check_vertical_move(choosen_grid, selected_grid, d):
                        players[play_turn][players[play_turn].index(choosen_grid)] = selected_grid
                        
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


        # Updating screen
        pygame.time.Clock().tick(30)
        pygame.display.flip()



if __name__ == "__main__":
    main()