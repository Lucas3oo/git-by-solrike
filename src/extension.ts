import * as vscode from 'vscode'
import { API, GitExtension, Repository } from './git'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('git-by-solrike.discardChanges', () => {
      // the git command must take the current selected file
      vscode.commands.executeCommand('git.clean')
    })
  )
  context.subscriptions.push(
    vscode.commands.registerCommand('git-by-solrike.openChanges', () => {
      // the git command must take the current selected file
      vscode.commands.executeCommand('git.openChange')
    })
  )

  const gitExtension: GitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git')!.exports
  const gitApi: API = gitExtension.getAPI(1)

  context.subscriptions.push(
    vscode.commands.registerCommand('git-by-solrike.openChangesWithBranch', (uri: vscode.Uri) => {
      let ref = getDefaultBranch(gitApi, uri)
      const gitUri = gitApi.toGitUri(uri, ref)
      const filePath = uri.path.replace(vscode.workspace.rootPath! + '/', '')
      vscode.commands.executeCommand('vscode.diff', gitUri, uri, filePath + ' compare with "' + ref + '"')
    })
  )
}

export function deactivate() {}

function getDefaultBranch(gitApi: API, uri: vscode.Uri): string {
  const repo = gitApi.getRepository(uri)
  const defaultBranch = repo?.state.HEAD?.name || 'main'
  return defaultBranch
}
