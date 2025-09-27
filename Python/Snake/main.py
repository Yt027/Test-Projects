from random import randint
import pygame, sys
pygame.init()


screen = pygame.display.set_mode((600, 500))
pygame.display.set_caption("Snake.py")


def main():
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()


if __name__ == "__main__":
    main()