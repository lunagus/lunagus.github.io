export type TerminalCommandHandler = (args: string[]) => string | string[];

export interface TerminalCommand {
  name: string;
  description: string;
  handler: TerminalCommandHandler;
}
