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
    "DELTA": 0.016
}

PLAYER = {
    "w": 50,
    "h": 75,
    "x": 30,
    "y": GROUND - 75 - 5,
    "velocity": 0,
    "jump_hight": 1600,
    "jump_speed": 120
}

COLORS = {
    "background": (15, 20, 25),
    "text": (245, 245, 250),
    "ground": (130, 110, 110),
    "primary": (30, 170, 240)
}