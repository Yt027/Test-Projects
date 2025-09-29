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
DELTA = 0

COLORS = {
    "background": (15, 20, 25),
    "text": (245, 245, 250)
}