import pygame, sys
pygame.init()

screen = pygame.display.set_mode((600, 600))
pygame.set_caption("Tic Tac Toe")

# Global variables
click = False




def main():
    while True:
        # Fetching user events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit()
                quit()

        # Drawing everything
        screen.fill((255, 255, 255))

        # Updating screen
        pygame.time.Clock().tick(10)
        pygame.display.flip()



if __name__ == "__main__":
    main()