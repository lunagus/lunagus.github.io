'use client';

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Link,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';

import { parseCommand, getAutocomplete } from "@/lib/terminal/parser";
import { fadeInUp } from "@/lib/animations";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Terminal() {
  const bg = useColorModeValue("gray.900", "gray.800");
  const promptColor = useColorModeValue("blue.400", "blue.300");
  const outputColor = useColorModeValue("green.400", "green.300");
  const titleColor = useColorModeValue("cyan.400", "cyan.300");

  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [autocomplete, setAutocomplete] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(false); // Don't boot immediately
  const [hasStartedBoot, setHasStartedBoot] = useState(false); // Track if boot has ever started
  const [currentBootLine, setCurrentBootLine] = useState(0);
  const [typingLine, setTypingLine] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Intersection observer to detect when terminal is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStartedBoot) {
          // Terminal is now visible and hasn't started booting yet
          setHasStartedBoot(true);
          setIsBooting(true);
        }
      },
      {
        threshold: 0.2, // 20% visibility needed
        rootMargin: '0px' // No margin - only when actually visible
      }
    );

    const terminalElement = terminalRef.current;
    if (terminalElement) {
      observer.observe(terminalElement);
    }

    return () => {
      if (terminalElement) {
        observer.unobserve(terminalElement);
      }
    };
  }, [hasStartedBoot]);

  // Helper function to render text with clickable links
  const renderTextWithLinks = (text: string) => {
    // More specific URL pattern to avoid false positives
    const urlPattern = /(https?:\/\/[^\s]+|\/[^\s]+\.pdf|github\.com\/[^\s]+|\/CV\.pdf|\/[A-Z][a-z]+[A-Z][a-zA-Z]+)/g;
    const parts = text.split(urlPattern);
    const matches = text.match(urlPattern) || [];

    return parts.map((part, index) => {
      const isUrl = matches.some(match => match === part);
      
      if (isUrl) {
        // Check if it's a URL or file path
        if (part.startsWith('http') || part.startsWith('github.com')) {
          const url = part.startsWith('github.com') ? `https://${part}` : part;
          return (
            <Link 
              key={index} 
              href={url} 
              color="cyan.300" 
              textDecoration="underline"
              isExternal
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </Link>
          );
        } else if (part.startsWith('/') && (part.includes('.pdf') || part.match(/\/[A-Z][a-z]+[A-Z][a-zA-Z]+/))) {
          // Only handle specific file paths and project IDs (like /SongSeek, /ProjectName)
          return (
            <Link 
              key={index} 
              href={part} 
              color="cyan.300" 
              textDecoration="underline"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </Link>
          );
        }
      }
      return part as React.ReactNode;
    });
  };

  // Boot sequence
  const bootSequence = useMemo(() => [
    "Welcome! I'm Agustin Luna, dev.",
    "",
    "💡 Type 'help' to explore my portfolio commands",
    "   • View projects, skills, experience, and more",
    "   • Try 'whoami', 'uptime', or 'projects --view=SongSeek'",
    "   • Press Tab to autocomplete commands",
    "",
  ], []);

  // Typing animation for boot sequence
  useEffect(() => {
    if (isBooting && currentBootLine < bootSequence.length) {
      const line = bootSequence[currentBootLine];
      
      if (!isTyping) {
        setTypingLine("");
        setIsTyping(true);
        setCurrentTypingIndex(0);
      }
      
      const typingTimer = setTimeout(() => {
        if (currentTypingIndex < line.length) {
          setTypingLine(prev => prev + line[currentTypingIndex]);
          setCurrentTypingIndex(prev => prev + 1);
          // Real-time auto-scroll during typing
          contentRef.current?.scrollTo({
            top: contentRef.current.scrollHeight,
            behavior: 'smooth'
          });
        } else {
          // Line finished typing
          setLines(prev => [...prev, line]);
          setTypingLine("");
          setIsTyping(false);
          setCurrentBootLine(prev => prev + 1);
          // Auto-scroll after each line
          contentRef.current?.scrollTo({
            top: contentRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 8); // Even faster typing speed
      
      return () => clearTimeout(typingTimer);
    } else if (currentBootLine >= bootSequence.length) {
      setIsBooting(false);
      // Focus input after boot completes
      setTimeout(() => {
        inputRef.current?.focus();
        // Auto-scroll to bottom after boot
        contentRef.current?.scrollTo({
          top: contentRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 300);
    }
  }, [isBooting, currentBootLine, currentTypingIndex, isTyping, bootSequence]);

  // Typing animation for command output
  const typeOutput = (output: string[]) => {
    setIsTyping(true);
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    
    const typeNextChar = () => {
      if (currentLineIndex < output.length) {
        const line = output[currentLineIndex];
        
        if (currentCharIndex < line.length) {
          setTypingLine(line.substring(0, currentCharIndex + 1));
          currentCharIndex++;
          // Real-time auto-scroll during typing
          contentRef.current?.scrollTo({
            top: contentRef.current.scrollHeight,
            behavior: 'smooth'
          });
          setTimeout(typeNextChar, 3); // Much faster typing speed for output
        } else {
          // Line finished
          setLines(prev => [...prev, line]);
          setTypingLine("");
          currentLineIndex++;
          currentCharIndex = 0;
          // Auto-scroll after each line
          contentRef.current?.scrollTo({
            top: contentRef.current.scrollHeight,
            behavior: 'smooth'
          });
          setTimeout(typeNextChar, 20); // Very short pause between lines
        }
      } else {
        setIsTyping(false);
        // Auto-scroll to bottom immediately after typing completes
        contentRef.current?.scrollTo({
          top: contentRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    };
    
    typeNextChar();
  };

  // Focus input on mount (after boot)
  useEffect(() => {
    if (!isBooting) {
      inputRef.current?.focus();
    }
  }, [isBooting]);

  // Handle command execution
  const runCommand = (cmd: string) => {
    if (!cmd.trim() || isTyping) return;

    setLines((prev) => [...prev, `$ ${cmd}`]);

    const { fn, args } = parseCommand(cmd);

    if (!fn) {
      const errorOutput = [
        "",
        "❌ COMMAND NOT FOUND ❌",
        "═══════════════════════════════════════════════════════════════",
        "",
        `🔍 Unknown command: '${cmd}'`,
        "",
        "💡 Available commands:",
        "   help, clear, cls, profile, whoami, uptime, echo",
        "   skills, projects, experience, contact, resume, social, stack",
        "",
        "🎯 Try these examples:",
        "   • help                 • Show all commands",
        "   • whoami               • Display my info", 
        "   • projects             • List my projects",
        "   • skills --level       • Show skill levels",
        "   • projects --view=SongSeek • Detailed project view",
        "",
        "💡 Type 'help' for complete command list and usage!"
      ];
      typeOutput(errorOutput);
      return;
    }

    const output = fn(args);

    if (output === "__CLEAR__") {
      setLines([bootSequence.join("\n").split("\n").slice(0, -1).join("\n")]); // Keep boot header
      return;
    }

    if (Array.isArray(output)) {
      typeOutput(output);
    } else {
      typeOutput([output]);
    }
  };

  // Handle key presses
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isBooting) return; // Disable input during boot

    // Enter
    if (e.key === "Enter") {
      runCommand(input);
      setHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      setInput("");
      setAutocomplete([]);
    }

    // Arrow up
    if (e.key === "ArrowUp") {
      if (history.length === 0) return;
      const newIndex = historyIndex === -1 ? history.length - 1 : historyIndex - 1;
      setHistoryIndex(Math.max(0, newIndex));
      setInput(history[Math.max(0, newIndex)]);
    }

    // Arrow down
    if (e.key === "ArrowDown") {
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    }

    // Tab → autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      if (autocomplete.length > 0) {
        setInput(autocomplete[0]);
        setAutocomplete([]);
      }
    }

    // Ctrl+C / Ctrl+L for clear
    if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "l")) {
      e.preventDefault();
      runCommand("clear");
    }
  };

  // Live autocomplete
  useEffect(() => {
    if (input.trim() && !isBooting) {
      setAutocomplete(getAutocomplete(input.trim()));
    } else {
      setAutocomplete([]);
    }
  }, [input, isBooting]);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    // Real-time auto-scroll for any content changes
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [lines, typingLine]);

  return (
    <Box id="about" as="section" py={20}>
      <Container maxW="1200px">
        <VStack spacing={12} align="stretch">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SectionTitle 
              title="About Me"
              subtitle="Get to know me better through this interactive terminal experience"
            />
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Box ref={terminalRef} bg={bg} p={6} fontFamily="mono" borderRadius="lg" shadow="xl">
              <VStack align="stretch" spacing={2} height="500px" maxH="500px">
                {/* Terminal Header */}
                <HStack mb={2} pb={2} borderBottom="1px solid" borderColor="gray.600" flexShrink={0}>
                  <Box w={3} h={3} borderRadius="full" bg="red.500" />
                  <Box w={3} h={3} borderRadius="full" bg="yellow.500" />
                  <Box w={3} h={3} borderRadius="full" bg="green.500" />
                  <Text color="gray.400" ml={4} fontSize="sm">
                    portfolio-terminal@lunagus:~$
                  </Text>
                </HStack>

                {/* Terminal Content */}
                <VStack 
                  ref={contentRef}
                  align="stretch" 
                  spacing={1} 
                  flex={1} 
                  overflow="auto" 
                  pr={2}
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'gray.600',
                      borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: 'gray.500',
                    },
                  }}
                >
                  {/* Show placeholder until terminal boots */}
                  {!hasStartedBoot && (
                    <Text color="gray.500" fontSize="sm" fontStyle="italic">
                      💻 Terminal ready... Scroll down to start the interactive experience
                    </Text>
                  )}

                  {lines.map((line, idx) => (
                    <Text 
                      key={idx} 
                      color={
                        line.startsWith("╔") || line.startsWith("╚") || line.startsWith("║") ? titleColor :
                        line.startsWith("$") ? promptColor : 
                        line.startsWith("✓") ? "green.300" :
                        line.startsWith("🚀") || line.startsWith("🎉") || line.startsWith("👋") ? "cyan.300" :
                        line.startsWith("❌") ? "red.400" :
                        line.startsWith("💡") ? "yellow.300" :
                        outputColor
                      }
                      fontSize="sm"
                      whiteSpace="pre-wrap"
                      flexShrink={0}
                    >
                      {renderTextWithLinks(line)}
                    </Text>
                  ))}

                  {/* Typing line for boot sequence */}
                  {isBooting && typingLine && (
                    <Text 
                      color={
                        typingLine.startsWith("╔") || typingLine.startsWith("╚") || typingLine.startsWith("║") ? titleColor :
                        typingLine.startsWith("$") ? promptColor : 
                        typingLine.startsWith("✓") ? "green.300" :
                        typingLine.startsWith("🚀") || typingLine.startsWith("🎉") || typingLine.startsWith("👋") ? "cyan.300" :
                        typingLine.startsWith("❌") ? "red.400" :
                        typingLine.startsWith("💡") ? "yellow.300" :
                        outputColor
                      }
                      fontSize="sm"
                      whiteSpace="pre-wrap"
                      flexShrink={0}
                    >
                      {renderTextWithLinks(typingLine)}
                      <Box as="span" color="white" animation="blink 1s infinite">_</Box>
                    </Text>
                  )}

                  {/* Typing line for command output */}
                  {!isBooting && typingLine && (
                    <Text 
                      color={outputColor}
                      fontSize="sm"
                      whiteSpace="pre-wrap"
                      flexShrink={0}
                    >
                      {renderTextWithLinks(typingLine)}
                      <Box as="span" color="white" animation="blink 1s infinite">_</Box>
                    </Text>
                  )}

                  {/* Autocomplete */}
                  {autocomplete.length > 0 && !isBooting && hasStartedBoot && !isTyping && (
                    <Text color="yellow.300" fontSize="sm" flexShrink={0}>
                      💡 {autocomplete.join("   ")}
                    </Text>
                  )}

                  {/* Input line */}
                  {!isBooting && hasStartedBoot && !isTyping && (
                    <HStack flexShrink={0}>
                      <Text color={promptColor}>$</Text>
                      <Input
                        ref={inputRef}
                        variant="unstyled"
                        color="white"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder=""
                        spellCheck={false}
                      />
                    </HStack>
                  )}
                </VStack>
              </VStack>
            </Box>
          </motion.div>
        </VStack>
      </Container>
      
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </Box>
  );
}
