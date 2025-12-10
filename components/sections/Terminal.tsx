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
import { useTypewriter } from "@/lib/hooks/useTypewriter";
import { useScrollToBottom } from "@/lib/hooks/useScrollToBottom";

import { parseCommand, getAutocomplete } from "@/lib/terminal/parser";
import { fadeInUp } from "@/lib/animations";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useI18n } from "@/lib/i18n/context";

export function Terminal() {
  const { t } = useI18n();
  const bg = useColorModeValue("gray.900", "gray.800");
  const promptColor = useColorModeValue("blue.400", "blue.300");
  const outputColor = useColorModeValue("green.400", "green.300");
  const titleColor = useColorModeValue("cyan.400", "cyan.300");

  const [history, setHistory] = useState<string[]>([]); // Permanent history
  const [commandHistory, setCommandHistory] = useState<string[]>([]); // For ArrowUp/Down
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [input, setInput] = useState("");
  const [autocomplete, setAutocomplete] = useState<string[]>([]);
  const [hasStartedBoot, setHasStartedBoot] = useState(false);
  const [isTerminalActive, setIsTerminalActive] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Custom Hooks
  const { 
    displayedLines: typeWriterLines, 
    currentTypingLine, 
    isTyping, 
    start: startTyping, 
    skip: skipTyping 
  } = useTypewriter(1.5); // 1.5x speed

  // Combine permanent history with current typing session
  const allLines = useMemo(() => {
    const lines = [...history, ...typeWriterLines];
    if (currentTypingLine) {
        lines.push(currentTypingLine);
    }
    return lines;
  }, [history, typeWriterLines, currentTypingLine]);

  // Auto-scroll whenever content changes
  useScrollToBottom(contentRef, [allLines, isTyping, autocomplete], isTerminalActive || isTyping);

  // Intersection observer to start boot
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedBoot) {
          setHasStartedBoot(true);
          startTyping([
            "Welcome! I'm Agustin Luna, dev.",
            "",
            "💡 Type 'help' to explore my portfolio commands",
            "   • View projects, skills, experience, and more",
            "   • Try 'whoami', 'socials', or 'skills --level'",
            "   • Press Tab to autocomplete commands",
            "",
          ]);
        }
      },
      { threshold: 0.2 }
    );

    if (terminalRef.current) observer.observe(terminalRef.current);
    return () => observer.disconnect();
  }, [hasStartedBoot, startTyping]);


  // Push typewriter content to history when typing finishes
  // Actually, useTypewriter reset its state when we call start() again.
  // So we need to "commit" the typed lines to history BEFORE starting new typing?
  // OR, we just append to history in runCommand, and useTypewriter mainly for new output?
  // 
  // Better approach:
  // 1. `history` stores EVERYTHING that is "done".
  // 2. `runCommand` adds the command to `history` immediately.
  // 3. `runCommand` triggers `startTyping(output)` for the RESULT.
  // 4. We need a way to know when typewriter finishes a block, to move it to history.
  // 
  // Let's adjust:
  // We can just keep `typeWriterLines` visible until the NEXT command runs.
  // When running a new command:
  //   setHistory(prev => [...prev, ...typeWriterLines]);
  //   startTyping(newOutput);
  
  const commitTypingToHistory = useCallback(() => {
    if (typeWriterLines.length > 0) {
      setHistory(prev => [...prev, ...typeWriterLines]);
    }
  }, [typeWriterLines]);

  const runCommand = useCallback((cmd: string) => {
    if (!cmd.trim()) return;

    // Commit previous output to history before starting new one
    // NOTE: If we are midway typing, we skip?
    if (isTyping) {
        skipTyping();
        // Force a simplified commit handled by the effect/logic below?
        // Simpler: Just add the PREVIOUS typewriter content to history
    }
    
    // We need to commit what was previously in typewriter to history
    // But `typeWriterLines` updates as we type. 
    // If we call start(), it resets.
    // So we MUST capture current `typeWriterLines` and add to history.
    
    setHistory(prev => [...prev, ...typeWriterLines, `$ ${cmd}`]);
    
    const { fn, args } = parseCommand(cmd);

    if (!fn) {
       startTyping([
        "",
        "❌ COMMAND NOT FOUND ❌",
        "════════════════════════════════════════",
        `🔍 Unknown command: '${cmd}'`,
        "",
        "💡 Available commands:",
        "   help, clear, cls, profile, whoami",
        "   projects, experience, contact, resume",
        ""
      ]);
      return;
    }

    const output = fn(args);

    if (output === "__CLEAR__") {
      setHistory([]); // Keep boot lines? Maybe just clear all.
      startTyping([]); // Clear typewriter
    } else {
      const lines = Array.isArray(output) ? output : [output];
      startTyping(lines);
    }

  }, [isTyping, skipTyping, typeWriterLines, startTyping]);

  
  // Handlers
  const handleTerminalClick = () => {
    setIsTerminalActive(true);
    inputRef.current?.focus();
    if (isTyping) skipTyping();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter
    if (e.key === "Enter") {
      runCommand(input);
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      setInput("");
      setAutocomplete([]);
    }

    // Arrow up
    if (e.key === "ArrowUp") {
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : historyIndex - 1;
      setHistoryIndex(Math.max(0, newIndex));
      setInput(commandHistory[Math.max(0, newIndex)]);
    }

    // Arrow down
    if (e.key === "ArrowDown") {
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }

    // Tab → autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      if (autocomplete.length > 0) {
        setInput(autocomplete[0]);
        setAutocomplete([]);
      }
    }

    // Ctrl+C / Ctrl+L
    if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "l")) {
      e.preventDefault();
      runCommand("clear"); // Or just clear input? Standard terminal just clears line or interrupts
      // For web terminal, clearing screen is nice.
      if (e.key === 'c') setInput("");
      if (e.key === 'l') runCommand("clear");
    }
  };

  // Live autocomplete
  useEffect(() => {
    if (input.trim()) {
      setAutocomplete(getAutocomplete(input.trim()));
    } else {
      setAutocomplete([]);
    }
  }, [input]);
  
  // Helper for rendering with links (Moved outside or kept simple)
  // We can rescue the previous `renderTextWithLinks`
  const renderTextWithLinks = useCallback((text: string) => {
    const urlPattern = /(https?:\/\/[^\s]+|\/[^\s]+\.pdf|github\.com\/[^\s]+|\/CV\.pdf|\/[A-Z][a-z]+[A-Z][a-zA-Z]+)/g;
    const parts = text.split(urlPattern);
    const matches = text.match(urlPattern) || [];

    return parts.map((part, index) => {
      const isUrl = matches.some(match => match === part);
      if (isUrl) {
        const href = part.startsWith('github.com') ? `https://${part}` : part;
        return (
          <Link key={index} href={href} color="cyan.300" textDecoration="underline" isExternal onClick={(e) => e.stopPropagation()}>
            {part}
          </Link>
        );
      }
      return part;
    });
  }, []);

  return (
    <Box id="about" as="section" py={20}>
      <Container maxW="1200px">
        <VStack spacing={12} align="stretch">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <SectionTitle title={t.about.title} subtitle={t.about.subtitle} />
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Box 
              ref={terminalRef} 
              bg={bg} 
              p={6} 
              fontFamily="mono" 
              borderRadius="lg" 
              shadow="xl"
              onClick={handleTerminalClick}
              tabIndex={0}
              cursor="text"
              minH="500px" // Fix height
            >
              <VStack align="stretch" spacing={2} height="500px" maxH="500px">
                {/* Header */}
                <HStack mb={2} pb={2} borderBottom="1px solid" borderColor="gray.600" flexShrink={0}>
                  <Box w={3} h={3} borderRadius="full" bg="red.500" />
                  <Box w={3} h={3} borderRadius="full" bg="yellow.500" />
                  <Box w={3} h={3} borderRadius="full" bg="green.500" />
                  <Text color="gray.400" ml={4} fontSize="sm">
                    portfolio-terminal@lunagus:~$
                  </Text>
                </HStack>

                {/* Content */}
                <VStack 
                  ref={contentRef}
                  align="stretch" 
                  spacing={1} 
                  flex={1} 
                  overflow="auto" 
                  pr={2}
                  css={{ '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { background: 'gray.600', borderRadius: '4px' } }}
                >
                  {!hasStartedBoot && (
                    <Text color="gray.500" fontSize="sm" fontStyle="italic">
                      💻 Initializing environment...
                    </Text>
                  )}

                  {allLines.map((line, idx) => (
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
                      wordBreak="break-word"
                    >
                      {renderTextWithLinks(line)}
                    </Text>
                  ))}
                  
                   {/* Input Line (Always visible now!) */}
                   {hasStartedBoot && (
                    <HStack spacing={2} pt={2}>
                      <Text color={promptColor} whiteSpace="nowrap">$</Text>
                      <Input
                        ref={inputRef}
                        variant="unstyled"
                        color="white"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isTyping ? "Typing..." : ""}
                        _placeholder={{ opacity: 0.4 }}
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                      />
                    </HStack>
                   )}
                   
                   {/* Autocomplete Hint */}
                   {autocomplete.length > 0 && (
                    <Text color="gray.500" fontSize="xs" pl={4}>
                      Host: {autocomplete.join("   ")}
                    </Text>
                   )}
                </VStack>
              </VStack>
            </Box>
          </motion.div>
        </VStack>
      </Container>
      
      {/* Keeping styles if needed, but removed the blink since cursor is input now */}
    </Box>
  );
}
