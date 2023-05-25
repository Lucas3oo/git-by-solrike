import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand('git-by-solrike.discardChanges', () => {
    // the git command must take the current selected file
    vscode.commands.executeCommand('git.clean');
  }));
  context.subscriptions.push(vscode.commands.registerCommand('git-by-solrike.openChanges', () => {
    // the git command must take the current selected file
    vscode.commands.executeCommand('git.openChange');
  }));
}

export function deactivate() { }
