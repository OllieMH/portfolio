# Oliver's Interactive Portfolio

An interactive, game-style portfolio website where visitors control a character to explore different sections using keyboard controls. Navigate through a 2D environment to discover information about me, my projects, CV, and social links.

## Live Demo

**[Visit the live site: omhille.no](https://omhille.no)**

## Features

-   **Interactive Character Movement** - Control a character using arrow keys or A/D keys
-   **About Me Section** - Walk to the house to reveal information about my background
-   **Project Hub** - Interact with the tree to access CV, Projects, and Socials
-   **Dynamic Hotspots** - Collision detection triggers interactive elements when you approach them
-   **Smooth Animations** - Fluid character movement and transition effects
-   **Accessibility Features** - ARIA labels, keyboard navigation, and semantic HTML
-   **Responsive Design** - Optimized for different screen sizes

## Technologies Used

-   **HTML5** - Semantic markup structure
-   **CSS3** - Custom styling with animations and transitions
-   **Vanilla JavaScript** - No frameworks, just pure JS.
-   **GitHub Pages** - Hosting and deployment

## How to Use

1. **Visit the website** at [omhille.no](https://omhille.no)
2. **Use keyboard controls** to move the character:
    - `Arrow Left` or `A` - Move left
    - `Arrow Right` or `D` - Move right
3. **Walk to the house** (chimney smoke) to view the About Me section
4. **Walk to the tree** to access interactive links for CV, Projects, and Socials
5. **Explore** the environment and discover all the interactive elements!

## Local Setup

Want to run this portfolio locally? Follow these steps:

```bash
# Clone the repository
git clone https://github.com/OllieMH/portfolio.git

# Navigate to the project directory
cd portfolio

# Open in your browser
# Option 1: Simply open index.html in your browser
# Option 2: Use a local server (recommended)
python -m http.server 8000
# or
npx serve
```

Then visit `http://localhost:8000` or open `index.html` in your browser.

## Project Structure

```
portfolio/
├── index.html          # Main HTML structure
├── style.css           # Styles and animations
├── script.js           # Game logic and interactions
├── CNAME              # Custom domain configuration
└── README.md          # You are here!
```

## Key Components

### PlayerController

Manages character movement, keyboard input, and animation loop with smooth delta-time based movement.

### HotspotManager

Handles collision detection between the player and interactive areas, triggering visual effects and content reveals.

## Future Enhancements

-   [ ] Add more interactive areas and sections
-   [ ] Implement mobile touch controls
-   [ ] Add sound effects for interactions
-   [ ] Add more easter eggs and hidden features
-   [ ] Implement a weather system with API data

## About the Developer

Hi! I'm Oliver, a 26-year-old customer advisor and IT student from Norway, passionate about web development and UX design. I've been tinkering with frontend development on and off for about 10 years and am currently pursuing a Bachelor's degree in IT and Digitalization.

## Connect With Me

-   **Website**: [omhille.no](https://omhille.no)
-   **GitHub**: [@OllieMH](https://github.com/OllieMH)
-   **LinkedIn**: [Oliver Matre Hille](https://www.linkedin.com/in/oliver-matre-hille-779b61239/)

## License

This project is open source and available under the [MIT License](LICENSE).

---
