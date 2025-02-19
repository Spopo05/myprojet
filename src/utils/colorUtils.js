export const getTextColor = (backgroundColor) => {
  if (!backgroundColor) return '#ffffff'; 

  const namedColors = {
    black: '#000000',
    white: '#ffffff',
    blue: '#0000ff',
    green: '#008000',
    purple: '#800080',
    orange: '#ffa500',
    grey: '#808080',
    pink: '#ffc0cb',
    red: '#ff0000',
    yellow: '#ffff00',
    maroon: '#800000'
  };

  backgroundColor = namedColors[backgroundColor.toLowerCase()] || backgroundColor;

  let color = backgroundColor.replace('#', '');

  if (color.length === 3) {
    color = color.split('').map(char => char + char).join('');
  }

  if (color.length !== 6) {
    console.warn('Invalid HEX color:', backgroundColor);
    return '#ffffff'; 
  }

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

 
  return brightness > 150 ? '#000000' : '#ffffff';
};
