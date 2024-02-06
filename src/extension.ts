import * as vscode from 'vscode';
import { importMissingLabels } from './importMissingLabels';
import { sortSelectedText } from './sortI18n';
import { getExcludePattern } from './util';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "i18n" is now active!');

	/***
	 * Sort select text in i18n file and retain comments
	 */
	const sortSelectedTextDisposable = vscode.commands.registerCommand('i18n.sortLines', sortSelectedText);

	/***
	 * Import labels from another i18n file
	 */
	const importMissingLabelsDisposable = vscode.commands.registerCommand('i18n.importMissingLabels', async () => {
		const currentFile = vscode.window.activeTextEditor?.document.fileName;
		if (currentFile) {
		  const importFiles = await vscode.window.showOpenDialog({
			canSelectFiles: true,
			canSelectFolders: false,
			canSelectMany: false,
			filters: { 'i18n Files': ['properties'] },
		  });
	
		  if (importFiles && importFiles.length > 0) {
			importMissingLabels(currentFile, importFiles[0].fsPath);
		  }
		} else {
		  vscode.window.showErrorMessage('No active text editor found.');
		}
	  });
	
	  const importMissingLabelsAndExcludeMatchingPattern = vscode.commands.registerCommand('i18n.importMissingLabelsAndExcludeMatchingPattern', async () => {
		const currentFile = vscode.window.activeTextEditor?.document.fileName;
		if (currentFile) {
		  const importFiles = await vscode.window.showOpenDialog({
			canSelectFiles: true,
			canSelectFolders: false,
			canSelectMany: false,
			filters: { 'i18n Files': ['properties'] },
		  });
	
		  if (importFiles && importFiles.length > 0) {
			importMissingLabels(currentFile, importFiles[0].fsPath, true, getExcludePattern());
		  }
		} else {
		  vscode.window.showErrorMessage('No active text editor found.');
		}
	  });
	
	  context.subscriptions.push(sortSelectedTextDisposable);
	  context.subscriptions.push(importMissingLabelsDisposable);
	  context.subscriptions.push(importMissingLabelsAndExcludeMatchingPattern);
}

// This method is called when your extension is deactivated
export function deactivate() {}
