import pygame
pygame.init()
from variables import *
from modules import *



pygame.display.set_caption("Tux Run")

def add_OBS():
    GAME["OBS"].append(GAME["OBJ"][randint(0, 2)].copy())


# Game function
def main():
    print(len(PLAYER["images"]))
    PLAYER["img_index"] = 0
    while True:
        # print(GAME["DELTA"] * 1000)
        if randint(0, 100) <= 1 and len(GAME["OBS"]) < 3:
            add_OBS()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                Window.close()
            
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    Window.close()

                # Making player jump
                elif event.key == pygame.K_SPACE:
                    if PLAYER["velocity"] == 0 and PLAYER["y"] == GROUND - PLAYER["h"] - 5:
                        # Avoid multiple jumps
                        PLAYER["velocity"] = -1300
                        PLAYER["y"] -= PLAYER["jump_hight"] * GAME["DELTA"]

        # Managing player
        # Jump
        if PLAYER["y"] < GROUND - PLAYER["h"] - 5:
            PLAYER["velocity"] += PLAYER["jump_speed"]
            PLAYER["y"] += PLAYER["velocity"] * GAME["DELTA"]

            if PLAYER["y"] >= GROUND - PLAYER["h"] - 5 - (PLAYER["jump_speed"] / 2) and PLAYER["velocity"] >= 0:
                PLAYER["y"] = GROUND - PLAYER["h"] - 5
                PLAYER["velocity"] = 0
    

        
        # Draw everything
        Window.draw()

        # Ground
        pygame.draw.line(screen, (COLORS["ground"]), (10, GROUND), (SCREEN_WIDTH - 10, GROUND))

        # Obstacles
        OBS_BIN = []
        for obs in GAME["OBS"]:
            obs[0] -= PLAYER["run_speed"] * GAME["DELTA"]
            obs_rect = pygame.Rect(obs[0], obs[1], obs[2], obs[3])
            pygame.draw.rect(screen, COLORS["primary"], obs_rect)

            # Manage collision with player
            if obs_rect.colliderect((PLAYER["x"], PLAYER["y"], PLAYER["w"], PLAYER["h"])):
                GAME["OVER"] = True

            if obs[0] <= -100:
                OBS_BIN.append(obs)
        
        for obs_ in OBS_BIN:
            GAME["OBS"].remove(obs_)

        # Player
        screen.blit(pygame.transform.scale(PLAYER["images"][PLAYER["img_index"]], (100, 100)), (PLAYER["x"], PLAYER["y"]))
        # pygame.draw.rect(screen, COLORS["primary"], (PLAYER["x"], PLAYER["y"], PLAYER["w"], PLAYER["h"]))

        # Game Over
        if GAME["OVER"]:
            print("Game Over")

        # Updating screen
        Window.update()




if __name__ == "__main__":
    main()