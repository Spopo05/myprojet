export const getTextColor = (backgroundColor) => {
    if (!backgroundColor) return '#ffffff'; // Default to white if no color is provided
  
    let color = backgroundColor.replace('#', '');
  
    // Handle shorthand hex #RGB by converting it to #RRGGBB
    if (color.length === 3) {
      color = color.split('').map(char => char + char).join('');
    }
  
    if (color.length !== 6) {
      console.warn('Invalid HEX color:', backgroundColor);
      return '#ffffff'; // Fallback color
    }
  
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
  
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#2d3748' : '#ffffff';
  };
  