/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#172033',
    tint: '#4F46E5',

    // Core surfaces
    background: '#F6F7FB',
    foreground: '#172033',

    // Cards / elevated surfaces
    card: '#FFFFFF',
    cardForeground: '#172033',

    // Primary action color (buttons, links, active states)
    primary: '#4F46E5',
    primaryForeground: '#ffffff',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#ECECFF',
    secondaryForeground: '#3730A3',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#EEF0F6',
    mutedForeground: '#667085',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#FFF1D6',
    accentForeground: '#9A5B13',

    // Destructive actions (delete, error states)
    destructive: '#C2415A',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: '#E3E6EF',
    input: '#DDE1EB',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 18,
};

export default colors;
