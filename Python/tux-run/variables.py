import pygame, sys
from random import randint
from widgets import *
pygame.init()


# Global Variables
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 500
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
MAIN_CLOCK = pygame.time.Clock()
FPS = 30
GROUND = SCREEN_HEIGHT - 20

GAME = {
    "DELTA": 0.016,
    "real_fps": 60,
    "OBJ": [
        # List of game obstacle types
        [SCREEN_WIDTH + 10, GROUND - 40, 20, 40], # Small cactus
        [SCREEN_WIDTH + 10, GROUND - 60, 30, 60], # Large cactus
        [SCREEN_WIDTH + 10, GROUND - 150, 40, 30]  # Bird
    ],
    "OBS": [
        # List of current obstacles on screen    
    ],
    "OVER": False
}

PLAYER = {
    "w": 100,
    "h": 100,
    "x": 30,
    "y": GROUND - 100 - 5,
    "health": 100,
    "velocity": 0,
    "jump_hight": 1600,
    "jump_speed": 100,
    "run_speed": 300,
    "images": [pygame.image.load(f"./assets/player/run{i}.png") for i in range(8)]
}

COLORS = {
    "background": (15, 20, 25),
    "text": (245, 245, 250),
    "ground": (130, 110, 110),
    "primary": (30, 170, 240)
}