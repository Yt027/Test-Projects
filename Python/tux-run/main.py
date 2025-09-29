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

        
        # Draw everything
        Window.draw()

        # Updating screen
        Window.update()




if __name__ == "__main__":
    main()