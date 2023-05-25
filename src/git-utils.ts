import * as vscode from 'vscode';

export function getGitExe(): string {
  const ext = vscode.extensions.getExtension("vscode.git");
  const api = ext!.exports.getAPI(1);
  const path: string = api.git.path;
  return path;
}

