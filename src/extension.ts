import * as vscode from 'vscode'
import { API, GitExtension, Repository } from './git'

// commands: https://github.com/microsoft/vscode/blob/ce46f445c0f1c3992b78a0e401c6125f1aac7bf9/extensions/git/src/commands.ts
// search for e.g. @command('git.branchFrom'
// https://stackoverflow.com/questions/46511595/how-to-access-the-api-for-git-in-visual-studio-code/60238771#60238771

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
  // const gitlensExt = vscode.extensions.getExtension('eamodio.gitlens')

  // if (gitlensExt?.isActive) {
  //   vscode.commands.executeCommand('setContext', 'gitlensExtIsActive', true)
  //   context.subscriptions.push(
  //     vscode.commands.registerCommand('git-by-solrike.openChangesWithBranch', () => {
  //       vscode.commands.executeCommand('gitlens.diffWithRevisionFrom')
  //     })
  //   )
  // }

  const gitExtension: GitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git')!.exports
  const gitApi: API = gitExtension.getAPI(1)
  context.subscriptions.push(
    vscode.commands.registerCommand('git-by-solrike.openChangesWithBranch', (uri: vscode.Uri) => {
      const gitUri = gitApi.toGitUri(uri, 'main')
      console.log()
      vscode.commands.executeCommand('vscode.diff', gitUri, uri, 'smurf')
    })
  )
}

export function deactivate() {}

// https://github.com/fabiospampinato/vscode-git-history/blob/master/src/utils.ts

// https://github.com/kappariver/git-open-diff/
