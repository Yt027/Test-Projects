import pygame
pygame.init()
from variables import *
from modules import *



pygame.display.set_caption("Tux Run")

def add_OBS():
    GAME["OBS"].append([SCREEN_WIDTH + 10, GROUND - 40, 20, 40])


# Game function
def main():
    while True:
        if randint(0, 100) == 5 and len(GAME["OBS"]) < 3:
            add_OBS()

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
        # print(len(GAME["OBJ"]))
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

        # Obstacles
        OBS_BIN = []
        for obs in GAME["OBS"]:
            obs[0] -= PLAYER["run_speed"] * GAME["DELTA"]
            pygame.draw.rect(screen, COLORS["primary"], (obs[0], obs[1], obs[2], obs[3]))

            if obs[0] <= -10:
                OBS_BIN.append(obs)
        
        for obs_ in OBS_BIN:
            GAME["OBS"].remove(obs_)

        # Player
        pygame.draw.rect(screen, COLORS["primary"], (PLAYER["x"], PLAYER["y"], PLAYER["w"], PLAYER["h"]))

        # Updating screen
        Window.update()




if __name__ == "__main__":
    main()