import { useState, useCallback, useRef, useEffect } from 'react';

interface TypewriterState {
  displayedLines: string[];
  currentTypingLine: string;
  isTyping: boolean;
}

export function useTypewriter(speedMultiplier: number = 1) {
  const [state, setState] = useState<TypewriterState>({
    displayedLines: [],
    currentTypingLine: "",
    isTyping: false,
  });

  const queueRef = useRef<string[]>([]);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const currentLineIndexRef = useRef<number>(0);
  const charsProcessedRef = useRef<number>(0);
  
  // Base speeds (ms per char)
  const CHAR_DELAY = 10 / speedMultiplier; 
  const LINE_DELAY = 50 / speedMultiplier;

  const stop = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
  }, []);

  const processQueue = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    
    const elapsed = timestamp - startTimeRef.current;
    
    // We are typing the queueRef.current array
    const allLines = queueRef.current;
    
    if (currentLineIndexRef.current >= allLines.length) {
      // Done
      setState({
        displayedLines: allLines,
        currentTypingLine: "",
        isTyping: false
      });
      return;
    }

    const currentLineText = allLines[currentLineIndexRef.current];
    
    // Calculate how many characters should be visible based on elapsed time for this line
    // We need to account for previous lines' time which is tricky in a single loop
    // Simpler approach: Incremental updates
    
    // Let's use a simpler "advance state" logic per frame
    // Ideally we want to type X chars per frame based on speed
    
    const charsToType = Math.max(1, Math.floor(elapsed / CHAR_DELAY));
    
    if (charsToType > charsProcessedRef.current) {
        // Advance check
        const nextCharIndex = charsToType; // simplified
        
        if (nextCharIndex <= currentLineText.length) {
            // Still typing current line
            setState(prev => ({
                ...prev,
                isTyping: true,
                currentTypingLine: currentLineText.substring(0, nextCharIndex),
                displayedLines: allLines.slice(0, currentLineIndexRef.current)
            }));
            frameRef.current = requestAnimationFrame(processQueue);
        } else {
            // Finished this line
            // Add delay before next line?
            // For simplicity, just move to next line immediately in next frame logic
            // Reset for next line
            currentLineIndexRef.current++;
            charsProcessedRef.current = 0;
            startTimeRef.current = 0; // Reset timer for next line
            
            // Commit the finished line
            setState(prev => ({
                displayedLines: allLines.slice(0, currentLineIndexRef.current),
                currentTypingLine: "",
                isTyping: true
            }));
            
            // Add a small pause?
            setTimeout(() => {
                 frameRef.current = requestAnimationFrame(processQueue);
            }, LINE_DELAY);
            return;
        }
    } else {
        frameRef.current = requestAnimationFrame(processQueue);
    }

  }, [CHAR_DELAY, LINE_DELAY]);


  const start = useCallback((lines: string[]) => {
    stop();
    queueRef.current = lines;
    currentLineIndexRef.current = 0;
    startTimeRef.current = 0;
    charsProcessedRef.current = 0;
    
    setState({
      displayedLines: [],
      currentTypingLine: "",
      isTyping: true
    });
    
    frameRef.current = requestAnimationFrame(processQueue);
  }, [stop, processQueue]);

  // Append new lines to existing displayed lines (for when we run a command, we add to history)
  // But this hook mainly manages *the typing output*.
  // So we probably want: 
  // 1. Terminal has `history: string[]`
  // 2. We call `startTyping(newOutput)`
  // 3. This hook types it out.
  // 4. When done, Terminal moves it to history? 
  // OR the Terminal just keeps rendering `history` + `typewriter.displayedLines` + `typewriter.currentTypingLine`
  
  const skip = useCallback(() => {
    stop();
    setState({
        displayedLines: queueRef.current,
        currentTypingLine: "",
        isTyping: false
    });
  }, [stop]);

  // Cleanup
  useEffect(() => stop, [stop]);

  return { ...state, start, skip, stop };
}
