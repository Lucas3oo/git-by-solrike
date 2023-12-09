import * as vscode from "vscode"
//import { API, GitExtension, Repository } from "./git"

// commands: https://github.com/microsoft/vscode/blob/ce46f445c0f1c3992b78a0e401c6125f1aac7bf9/extensions/git/src/commands.ts
// search for e.g. @command('git.branchFrom'
// https://stackoverflow.com/questions/46511595/how-to-access-the-api-for-git-in-visual-studio-code/60238771#60238771

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("git-by-solrike.discardChanges", () => {
      // the git command must take the current selected file
      vscode.commands.executeCommand("git.clean")
    })
  )
  context.subscriptions.push(
    vscode.commands.registerCommand("git-by-solrike.openChanges", () => {
      // the git command must take the current selected file
      vscode.commands.executeCommand("git.openChange")
    })
  )
  const gitlensExt = vscode.extensions.getExtension("eamodio.gitlens")

  if (gitlensExt?.isActive) {
    vscode.commands.executeCommand("setContext", "gitlensExtIsActive", true)
    context.subscriptions.push(
      vscode.commands.registerCommand(
        "git-by-solrike.openChangesWithBranch",
        () => {
          vscode.commands.executeCommand("gitlens.diffWithRevisionFrom")
        }
      )
    )
  }

  // context.subscriptions.push(
  //   vscode.commands.registerCommand("git-by-solrike.diff", () => {
  //     vscode.commands.executeCommand(
  //       "vscode.diff",
  //       vscode.Uri.file(
  //         "/Users/github-repos/lapce-eclipse-theme/README.md"
  //       ),
  //       vscode.Uri.file(
  //         "/Users//github-repos/lapce-eclipse-theme/volt.toml"
  //       ),
  //       "smurf"
  //     )
  //   })
  // )
  // context.subscriptions.push(
  //   vscode.commands.registerCommand(
  //     "git-by-solrike.mycommand",
  //     (uri: vscode.Uri) => {
  //       console.log(uri.fsPath)
  //     }
  //   )
  // )

  // const gitExtension: GitExtension =
  //   vscode.extensions.getExtension<GitExtension>("vscode.git").exports
  // const git: API = gitExtension.getAPI(1)

  // const repo: Repository = git.repositories[0]
}

export function deactivate() {}

// some

// function diff ( leftPath, rightPath, commit? ) {

//   const leftUri = vscode.Uri.file ( leftPath ),
//         rightUri = vscode.Uri.file ( rightPath ),
//         date = commit && Utils.commit.parse.date ( commit ),
//         hash = commit && Utils.commit.parse.hash ( commit ),
//         message = commit && Utils.commit.parse.message ( commit ),
//         title = commit ? [message, date, hash].join ( ' - ' ) : 'File Diff';

//   return vscode.commands.executeCommand ( 'vscode.diff', leftUri, rightUri, title );

// }

// https://github.com/fabiospampinato/vscode-git-history/blob/master/src/utils.ts

// https://github.com/kappariver/git-open-diff/

// {
//   "key": "",
//   "command": "gitlens.diffWithRevisionFrom"
// }
