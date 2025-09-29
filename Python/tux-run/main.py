import pygame
pygame.init()
from variables import *
from modules import *



pygame.display.set_caption("Tux Run")



# Game function
def main():
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                Window.close()
            
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    Window.close()

                # Making player jump
                elif event.key == pygame.K_SPACE:
                    PLAYER["velocity"] = -1300
                    PLAYER["y"] -= PLAYER["jump_hight"] * GAME["DELTA"]

        # Managing player
        # Jump
        # print(PLAYER["velocity"])
        print(GAME["DELTA"])
        if PLAYER["y"] < GROUND - 75 - 5:

            # if PLAYER["velocity"] < -PLAYER["jump_speed"] * 1.5:
            #     PLAYER["velocity"] = 0
            # else:
            PLAYER["velocity"] += PLAYER["jump_speed"]
            PLAYER["y"] += PLAYER["velocity"] * GAME["DELTA"]
        else:
            PLAYER["y"] = GROUND - 75 - 5
            PLAYER["velocity"] = 0
        

        
        # Draw everything
        Window.draw()

        # Ground
        pygame.draw.line(screen, (COLORS["ground"]), (10, GROUND), (SCREEN_WIDTH - 10, GROUND))

        # Player
        pygame.draw.rect(screen, COLORS["primary"], (PLAYER["x"], PLAYER["y"], PLAYER["w"], PLAYER["h"]))

        # Updating screen
        Window.update()




if __name__ == "__main__":
    main()