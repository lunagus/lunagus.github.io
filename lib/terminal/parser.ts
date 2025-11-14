import { commands } from "./commands";
import type { TerminalCommand } from "./types";

export function parseCommand(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return { fn: null, args: [] };

  // match longest command first (exact match for commands with -- flags)
  const exactMatch = commands.find((c: TerminalCommand) => trimmed === c.name);
  if (exactMatch) {
    return { fn: exactMatch.handler, args: [] };
  }

  // match commands with arguments (like 'echo hello world')
  const match = commands.find((c: TerminalCommand) => {
    // For commands with -- flags, check if input starts with command name
    if (c.name.includes('--')) {
      return trimmed.startsWith(c.name.split(' ')[0]);
    }
    return trimmed.startsWith(c.name);
  });

  if (!match) return { fn: null, args: [] };

  // Extract command name (handle both simple and -- flag commands)
  const commandName = match.name.includes('--') 
    ? match.name 
    : trimmed.split(' ')[0];
  
  const args = trimmed.replace(commandName, "").trim().split(" ").filter(Boolean);

  return { fn: match.handler, args };
}

export function getAutocomplete(partial: string) {
  if (!partial) return [];
  return commands
    .map((c: TerminalCommand) => c.name)
    .filter((name: string) => name.startsWith(partial));
}
