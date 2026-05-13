import pygame, sys, math, datetime
pygame.init()

screen_w = 700
screen_h = 700
screen_size = (screen_w, screen_h)

screen = pygame.display.set_mode(screen_size, pygame.RESIZABLE)
pygame.display.set_caption('Analogic Clock')


class App:
    def __init__(self):
        self.Clock = pygame.time.Clock()

    def label(self, text, x, y, font_size, color = (0, 0, 17), bold = False, normalize = False):
        # Getting int value into two digit number
        if normalize and int(text) < 10:
            text = '0' + text

        font = pygame.font.SysFont('Poppins', font_size, bold)
        label = font.render(text, True, color)

        screen.blit(label, (x, y))

    def exit(self):
        pygame.quit()
        sys.exit()

    def background(self):
        screen.fill((212, 212, 212))

    def refresh(self):
        self.Clock.tick(20)
        pygame.display.update()

    def arc_rect(self, rayon):
        screen_center_x = screen_w / 2
        screen_center_y = screen_h / 2

        rectangle = pygame.Rect(
            screen_center_x - rayon,
            screen_center_y - rayon,
            rayon * 2,
            rayon * 2
        )

        return rectangle
    
    def draw_arc(self, rayon, angle, color = (25, 25, 75)):
        rect = self.arc_rect(rayon)

        pygame.draw.arc(screen, color, rect, math.radians(angle - 2), math.radians(angle + 2), rayon)

    def draw_hour_stick(self, hour):
        angle = hour * (360 / 12)
        normalized_angle = (angle - 90) * -1
        self.draw_arc(150, normalized_angle, (25, 175, 25))

    def draw_minute_stick(self, minute):
        angle = minute * (360 / 60)
        normalized_angle = (angle - 90) * -1
        self.draw_arc(200, normalized_angle, (175, 175, 25))

    def draw_second_stick(self, second):
        angle = second * (360 / 60)
        normalized_angle = (angle - 90) * -1
        self.draw_arc(220, normalized_angle, (175, 25, 25))



def main():
    global screen_w, screen_h, screen
    
    APP = App()
    while True:
        now = datetime.datetime.now()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                APP.exit()

            if event.type == pygame.WINDOWRESIZED:
                screen_w = screen.get_width()
                screen_h = screen.get_height()
                screen_size = (screen_w, screen_h)


        # Draw background
        APP.background()


        # Clock parts
        # Cadre
        pygame.draw.circle(screen, (0, 212, 212), (screen_w / 2, screen_h /2), 250, 2)

        # Decorative sticks
        for i in range(60):
            if i % 5 == 0:
                angle = i * (360 / 60)
                normalized_angle = (angle - 90) * -1
                APP.draw_arc(250, normalized_angle, (0, 212, 212))

        pygame.draw.circle(screen, (212, 212, 212), (screen_w / 2, screen_h /2), 220)

        # Hours
        APP.draw_hour_stick(now.hour)
        
        # Minutes
        APP.draw_minute_stick(now.minute)

        # Seconds
        APP.draw_second_stick(now.second)

        # Center
        pygame.draw.circle(screen, (212, 212, 212), (screen_w / 2, screen_h /2), 50)

        # Digital display
        # Hour
        digital_factor_x = (screen_w / 2) - 20
        digital_factor_y = (screen_h / 2) - 40

        APP.label(str(now.hour), digital_factor_x + 0, digital_factor_y + 0, 42, (25, 175, 25), bold=True, normalize=True)
        
        # Minute
        APP.label(str(now.minute), digital_factor_x + 2, digital_factor_y + 30, 32, (175, 175, 25), bold=True, normalize=True)
        
        # Second
        APP.label(str(now.second), digital_factor_x + 2, digital_factor_y + 55, 35, (175, 25, 25), normalize=True)



        # Refresh screen
        APP.refresh()





if __name__ == '__main__':
    main()