export const getInitials = (name: string) => {
  const sentenceSplit = name.split(' ');
  return sentenceSplit.map(namePart => namePart.charAt(0)).join('');
};
