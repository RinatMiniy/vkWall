import { useState } from 'react';
import { TextTruncateProps } from '../interfaces/interfaces';

function trimTextToLength(text: string, maxLength: number) {
  if (text.length <= maxLength) {
      return text;
  }

  const trimmedText = text.slice(0, maxLength);
  const lastSpaceIndex = trimmedText.lastIndexOf(' ');

  if (lastSpaceIndex !== -1) {
    return trimmedText.slice(0, lastSpaceIndex);
  }
  return trimmedText;
}

function TextTruncate({ text, maxLength }: TextTruncateProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div onClick={toggleExpansion}>
      {expanded ? text : trimTextToLength(text, maxLength)}
      {text.length > maxLength && (
        <span onClick={toggleExpansion} className = "text-block">
          {expanded ? ' Скрыть' : ' Показать полностью'}
        </span>
      )}
    </div>
  );
};

export default TextTruncate;