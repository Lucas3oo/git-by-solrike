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
    vscode.commands.registerCommand('git-by-solrike.openChangesWithDefaultBranch', async (uri: vscode.Uri) => {
      let ref = await getDefaultBranch(gitApi, uri)
      const gitUri = gitApi.toGitUri(uri, ref)
      const filePath = getFileName(uri.path)
      vscode.commands.executeCommand('vscode.diff', gitUri, uri, filePath + ' compared with "' + ref + '" ')
    })
  )
}

export function deactivate() {}

async function getDefaultBranch(gitApi: API, uri: vscode.Uri): Promise<string> {
  const repo = gitApi.getRepository(uri)

  let defaultBranch = 'master'
  const branches = (await repo?.getBranches({})) ?? []
  branches.forEach((b) => {
    if (b.name === 'main') {
      defaultBranch = b.name
    }
  })
  return defaultBranch
}

function getFileName(filePath: string): string {
  return filePath.replace(/^.*[\\/]/, '')
}
