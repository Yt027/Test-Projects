import pygame
import sys

# --- Initialization ---
pygame.init()

# --- Constants and Setup ---
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
SCREEN = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Python Pygame Pong")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BLUE = (50, 150, 255)

# Game Object Dimensions
PADDLE_WIDTH = 15
PADDLE_HEIGHT = 100
BALL_SIZE = 15

# Game Speeds
PADDLE_SPEED = 8
BALL_INITIAL_SPEED = 6

# Fonts
FONT = pygame.font.Font(None, 75)

# --- Game Objects Setup ---
class Paddle:
    def __init__(self, x, y, color=BLUE):
        self.rect = pygame.Rect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT)
        self.color = color

    def move(self, direction):
        # Direction: 1 for down, -1 for up
        self.rect.y += direction * PADDLE_SPEED
        
        # Keep paddle within screen bounds
        if self.rect.top < 0:
            self.rect.top = 0
        if self.rect.bottom > SCREEN_HEIGHT:
            self.rect.bottom = SCREEN_HEIGHT

    def draw(self, screen):
        pygame.draw.rect(screen, self.color, self.rect)

class Ball:
    def __init__(self):
        self.rect = pygame.Rect(SCREEN_WIDTH // 2 - BALL_SIZE // 2, 
                                SCREEN_HEIGHT // 2 - BALL_SIZE // 2, 
                                BALL_SIZE, BALL_SIZE)
        self.speed_x = BALL_INITIAL_SPEED
        self.speed_y = BALL_INITIAL_SPEED
        self.reset()

    def reset(self):
        self.rect.x = SCREEN_WIDTH // 2 - BALL_SIZE // 2
        self.rect.y = SCREEN_HEIGHT // 2 - BALL_SIZE // 2
        # Give it a random initial direction for variety
        self.speed_x = BALL_INITIAL_SPEED * (1 if pygame.time.get_ticks() % 2 == 0 else -1)
        self.speed_y = BALL_INITIAL_SPEED * (1 if pygame.time.get_ticks() % 3 == 0 else -1)

    def update(self):
        self.rect.x += self.speed_x
        self.rect.y += self.speed_y

        # 1. Wall Collision (Top/Bottom)
        if self.rect.top <= 0 or self.rect.bottom >= SCREEN_HEIGHT:
            self.speed_y *= -1

        # 2. Scoring / Out of Bounds Check
        if self.rect.left <= 0 or self.rect.right >= SCREEN_WIDTH:
            # Scoring logic handled in the main game loop
            pass
            
    def draw(self, screen):
        pygame.draw.ellipse(screen, WHITE, self.rect)

# --- Game Logic ---

def check_paddle_collision(ball, paddle):
    if ball.rect.colliderect(paddle.rect):
        # Collision detected. Reverse X direction.
        ball.speed_x *= -1.05 # Increase speed slightly on hit
        
        # Calculate where the ball hit the paddle (normalized 0 to 1)
        relative_intersect_y = (paddle.rect.centery) - (ball.rect.centery)
        normalized_intersect_y = relative_intersect_y / (PADDLE_HEIGHT / 2)
        
        # Adjust Y speed based on hit location (makes it more dynamic)
        ball.speed_y = normalized_intersect_y * 12 # Max vertical speed adjustment
        
        # Ensure X speed is properly re-adjusted
        ball.speed_x *= -1

def draw_score(screen, score_p1, score_p2):
    text_p1 = pygame.font.Font(None, 75).render(str(score_p1), True, WHITE)
    text_p2 = pygame.font.Font(None, 75).render(str(score_p2), True, WHITE)
    screen.blit(text_p1, (SCREEN_WIDTH / 4 - text_p1.get_width() / 2, 20))
    screen.blit(text_p2, (SCREEN_WIDTH * 3 / 4 - text_p2.get_width() / 2, 20))

def handle_ai_movement(ai_paddle, ball):
    # Simple AI: Move paddle center towards the ball center (with dampening)
    ai_center = ai_paddle.rect.centery
    ball_center = ball.rect.centery
    
    # Only move if the ball is on the AI side and needs a change in Y
    if ball.speed_x > 0 and abs(ball_center - ai_center) > 10:
        if ball_center < ai_center - 10: # Ball is significantly above the center
            ai_paddle.move(PADDLE_SPEED * 0.8) # Move down
        elif ball_center > ai_center + 10: # Ball is significantly below the center
            ai_paddle.move(-PADDLE_SPEED * 0.8) # Move up
        # NOTE: The actual move function handles the boundary checks

# --- Main Game Loop ---
def game_loop():
    global running
    running = True
    clock = pygame.time.Clock()

    # Initialize objects
    player_paddle = Paddle(30, SCREEN_HEIGHT // 2 - PADDLE_HEIGHT // 2)
    ai_paddle = Paddle(SCREEN_WIDTH - 30 - PADDLE_WIDTH, SCREEN_HEIGHT // 2 - PADDLE_HEIGHT // 2, BLUE)
    ball = Ball()

    player_score = 0
    ai_score = 0

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
                pygame.display.quit()
                sys.exit()

        # --- Input Handling (Player 1) ---
        keys = pygame.key.get_pressed()
        # W key moves up (-1 direction), S key moves down (1 direction)
        if keys[pygame.K_w]:
            player_paddle.move(-1)
        if keys[pygame.K_s]:
            player_paddle.move(1)

        # --- AI Logic (Player 2) ---
        handle_ai_movement(ai_paddle, ball)

        # --- Game State Update ---
        
        # 1. Move the ball
        ball.update()

        # 2. Check Collisions
        check_paddle_collision(ball, player_paddle)
        check_paddle_collision(ball, ai_paddle)
        
        # 3. Check Scoring (Out of Bounds)
        scored = False
        if ball.rect.left <= 0: # AI scores
            ai_score += 1
            ball.reset()
            scored = True
        elif ball.rect.right >= SCREEN_WIDTH: # Player scores
            player_score += 1
            ball.reset()
            scored = True
        
        # 4. Draw everything
        SCREEN.fill(BLACK)
        pygame.draw.rect(SCREEN, WHITE, (SCREEN_WIDTH // 2 - 2, 0, 2, SCREEN_HEIGHT)) # Center line
        
        player_paddle.draw(SCREEN)
        ai_paddle.draw(SCREEN)
        ball.draw(SCREEN)
        draw_score(SCREEN, player_score, ai_score)

        # Update the display and maintain framerate
        pygame.display.flip()
        clock.tick(60) # 60 Frames per second

    # Cleanup (This code is generally unreachable if sys.exit() is called, but good practice)
    pygame.quit()

if __name__ == "__main__":
    game_loop()
