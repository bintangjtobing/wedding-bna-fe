import React, { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number; // milliseconds per character
  delay?: number; // delay before starting
  className?: string;
  onComplete?: () => void;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = "",
  onComplete,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Split text by \n to handle line breaks
  const lines = text.split("\n");
  const totalText = text.replace(/\n/g, " "); // For character counting

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startTyping = () => {
      setIsTyping(true);
      setCurrentIndex(0);
      setDisplayText("");
    };

    if (delay > 0) {
      timeoutId = setTimeout(startTyping, delay);
    } else {
      startTyping();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay, text]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < totalText.length) {
      const timeoutId = setTimeout(() => {
        // Build display text based on current index
        let charCount = 0;
        let newDisplayText = "";

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const lineEndIndex = charCount + line.length;

          if (currentIndex < lineEndIndex) {
            // We're still in this line
            newDisplayText += line.substring(0, currentIndex - charCount + 1);
            break;
          } else {
            // Complete line
            newDisplayText += line;
            if (i < lines.length - 1) {
              newDisplayText += "\n";
            }
            charCount += line.length;
          }
        }

        setDisplayText(newDisplayText);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeoutId);
    } else {
      // Typing complete
      setIsTyping(false);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, isTyping, totalText, speed, lines, onComplete]);

  // Render with line breaks
  const renderText = () => {
    return displayText.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < displayText.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className={className}>
      {renderText()}
      {isTyping && <span className="animate-pulse text-current">|</span>}
    </div>
  );
};

export default TypingAnimation;
