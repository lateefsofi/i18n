import * as vscode from 'vscode';
import { sortSelectedText } from './sortI18n';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "i18n" is now active!');

	/***
	 * Sort select text in i18n file and retain comments
	 */
	let disposable = vscode.commands.registerCommand('i18n.sortLines', () => {
		sortSelectedText();
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
