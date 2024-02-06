import * as vscode from 'vscode';

const config = vscode.workspace.getConfiguration('i18nmaster');
export function getExcludePattern(): RegExp {
    const regexParam = config.get<string>('excludePattern') || "";
    return new RegExp(regexParam);
}