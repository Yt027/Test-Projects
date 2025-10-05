import pygame
pygame.init()
from variables import *
from modules import *



pygame.display.set_caption("Tux Run")

def add_OBS():
    GAME["OBS"].append(GAME["OBJ"][randint(0, 2)].copy())


# Game function
def main():
    PLAYER["img_index"] = 0
    PLAYER["img_timer"] = 0

    # Camera
    camera_y = 200

    # Delta timer for obstacle generation
    OBS_DELTA = 0
    while True:
        print(PLAYER["bonus"])
        # Loading obstacles
        if randint(0, 100) <= 1 and len(GAME["OBS"]) < 3 and OBS_DELTA <= 0:
            add_OBS()
            OBS_DELTA = 750 # 750 miliseconds minimum delay between randomised obstacles

        if OBS_DELTA > 0:
            OBS_DELTA -= GAME["DELTA"] * 1000

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                Window.close()
            
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    Window.close()

                # Making player jump
                elif event.key == pygame.K_SPACE:
                    if PLAYER["velocity"] == 0 and PLAYER["y"] == GROUND - PLAYER["h"]:
                        # Avoid multiple jumps
                        PLAYER["y"] -= 50 # Small offset to avoid multiple jumps
                        PLAYER["velocity"] = PLAYER["jump_velocity"]

        # Managing player image changes
        PLAYER["img_timer"] += GAME["DELTA"] * 1000
        if PLAYER["img_timer"] >= 70: # 15 images per second
            PLAYER["img_timer"] -= 70
            PLAYER["img_index"] += 1
            if PLAYER["img_index"] == len(PLAYER["images"]):
                PLAYER["img_index"] = 0
        # Jump
        if PLAYER["y"] < GROUND - PLAYER["h"]:
            PLAYER["velocity"] += PLAYER["gravity"] * GAME["DELTA"]
            PLAYER["y"] += PLAYER["velocity"] * GAME["DELTA"]

            if PLAYER["y"] >= GROUND - PLAYER["h"]:
                PLAYER["y"] = GROUND - PLAYER["h"]
                PLAYER["velocity"] = 0
            
            # Update camera based on player's jump height
            camera_y += (((GROUND - PLAYER["h"]) - PLAYER["y"]) * 0.005 - camera_y) * 0.1
        
        else:
            # Smoothly return camera to ground level
            camera_y += (50 - camera_y) * 0.025
    

        
        # Draw everything
        Window.draw()

        # Ground
        pygame.draw.line(screen, (COLORS["ground"]), (10, GROUND - camera_y), (SCREEN_WIDTH - 10, GROUND - camera_y))

        # Obstacles
        OBS_BIN = []
        for i in range(len(GAME["OBS"])):
            obs = GAME["OBS"][i]
            obs[0] -= PLAYER["run_speed"] * GAME["DELTA"]
            obs_rect = pygame.Rect(obs[0], obs[1] - camera_y, obs[2], obs[3])
            pygame.draw.rect(screen, COLORS["primary"], obs_rect)


            # Manage collision with player
            if obs_rect.colliderect((PLAYER["x"], PLAYER["y"] - camera_y, PLAYER["w"], PLAYER["h"])):
                PLAYER["health"] -= 1

            else:
                # Manage player's bonus when jumping upon obstacle
                if PLAYER["y"] < GROUND - PLAYER["h"] and obs[0] <= PLAYER["x"] and obs[0] > PLAYER["x"] - PLAYER["run_speed"] * GAME["DELTA"]:
                    PLAYER["bonus"] += 1

            if obs[0] <= -100:
                OBS_BIN.append(obs)
        
        for obs_ in OBS_BIN:
            GAME["OBS"].remove(obs_)

        # Player
        screen.blit(pygame.transform.scale(PLAYER["images"][PLAYER["img_index"]], (100, 100)), (PLAYER["x"], PLAYER["y"] - camera_y))
        # pygame.draw.rect(screen, COLORS["primary"], (PLAYER["x"], PLAYER["y"], PLAYER["w"], PLAYER["h"]))

        # Game Over
        if GAME["OVER"]:
            print("Game Over")

        # Updating screen
        Window.update()




if __name__ == "__main__":
    main()