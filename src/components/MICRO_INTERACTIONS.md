/**
 * Micro-Interactions Guide
 * ========================
 * 
 * This file documents all micro-interactions implemented in the portfolio.
 * CSS-based and component-based interactions are automatically applied.
 * 
 * BUTTONS:
 * --------
 * - Default behavior via CSS: hover scale 1.02, click scale 0.97
 * - All <button> elements and [role="button"] get these interactions
 * - Smooth transitions with 150ms duration
 * 
 * CSS Classes: active:scale-95 hover:scale-102 
 * 
 * Example:
 * <button className="bg-pastel-pink text-white px-4 py-2 rounded">
 *   Click me
 * </button>
 * 
 * 
 * LINKS:
 * ------
 * - Underline animation on hover
 * - Smooth color transitions
 * - Uses CSS ::after pseudo-element
 * 
 * CSS Pattern (auto-applied):
 * - Creates invisible underline (width: 0)
 * - Animates to full width (100%) on hover
 * - Works on all <a> tags except .nav-link and .no-underline-animation
 * 
 * Example:
 * <a href="#projects">View my work</a>
 * 
 * To disable:
 * <a href="#" className="no-underline-animation">No underline</a>
 * 
 * 
 * CARDS:
 * ------
 * - 3D Tilt effect using react-parallax-tilt library
 * - Applied to ProjectCard component
 * - Smooth shadow and scale effects on hover
 * 
 * CSS Classes: tilt-card, interactive-element
 * 
 * Features:
 * - Max 5° tilt angle
 * - 400ms transition speed
 * - Smooth shadow expansion
 * 
 * Example usage in components:
 * import Tilt from 'react-parallax-tilt';
 * <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1} transitionSpeed={400}>
 *   <div className="tilt-card">Your card content</div>
 * </Tilt>
 * 
 * 
 * CUSTOM COMPONENTS:
 * ------------------
 * 
 * MicroButton: Pre-styled button with built-in interactions
 * import { MicroButton } from '@/components/MicroInteractions';
 * <MicroButton variant="default" size="md">Click me</MicroButton>
 * 
 * MicroLink: Pre-styled link with built-in underline animation
 * import { MicroLink } from '@/components/MicroInteractions';
 * <MicroLink href="#section">See more</MicroLink>
 * 
 * MicroCard: Pre-styled card with hover effects
 * import { MicroCard } from '@/components/MicroInteractions';
 * <MicroCard interactive={true}>Card content</MicroCard>
 * 
 * 
 * INTERACTIVE-ELEMENT CLASS:
 * --------------------------
 * Apply to any element for subtle scale interactions:
 * <div className="interactive-element">
 *   Hover effect: scale 1.02
 *   Click effect: scale 0.98
 * </div>
 * 
 * 
 * TAILWIND UTILITIES:
 * -------------------
 * Custom scale values added to Tailwind config:
 * - scale-102: Scales to 1.02x (hover effect)
 * - scale-98: Scales to 0.98x (click/active effect)
 * 
 * Can be used with other Tailwind modifiers:
 * <button className="hover:scale-102 active:scale-97">Button</button>
 * 
 * 
 * CSS CLASSES IN index.css:
 * -------------------------
 * 
 * .tilt-card
 * - For 3D tilt containers
 * - perspective: 1000px
 * - transition-transform duration-150
 * 
 * .interactive-element
 * - General purpose interactive element
 * - hover:scale-102 active:scale-98
 * - 200ms transition duration
 * 
 * .nav-link (existing)
 * - Navigation links with underline animation
 * - Integrated with button micro-interactions
 * 
 * 
 * IMPLEMENTATION SUMMARY:
 * ----------------------
 * 1. Global: All buttons get scale animations (CSS)
 * 2. Global: All links get underline animations (CSS)
 * 3. Cards: ProjectCard uses Tilt component for 3D effect
 * 4. Skills: Apply interactive-element class for subtle effects
 * 5. Forms: Input focus states preserved and enhanced
 * 6. Custom: MicroButton, MicroLink, MicroCard components for quick use
 * 
 * Browser Support:
 * - All modern browsers (Chrome, Firefox, Safari, Edge)
 * - Graceful degradation: Transforms used via CSS, no JS required for most
 * - Fallback: CSS transitions work without JavaScript
 */

export const MICRO_INTERACTIONS_GUIDE = {
  buttons: {
    hoverScale: 1.02,
    clickScale: 0.97,
    transitionDuration: '150ms',
    implementation: 'CSS-based via :hover and :active pseudo-classes'
  },
  links: {
    animation: 'underline width 0 -> 100%',
    transitionDuration: '300ms',
    implementation: 'CSS ::after pseudo-element'
  },
  cards: {
    effect: '3D tilt',
    library: 'react-parallax-tilt',
    maxAngle: 5,
    transitionDuration: '400ms',
    implementation: 'Component-based'
  },
  interactive: {
    hoverScale: 1.02,
    clickScale: 0.98,
    transitionDuration: '200ms',
    implementation: 'CSS class .interactive-element'
  }
};
