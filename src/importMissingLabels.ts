import * as vscode from 'vscode';
import * as fs from 'fs';


function extractLabelsAndComments(content: string) {
    const labels: {[key: string]: string} = {};
    const comments: {[key: string]: Array<string>}= {};
    const order: Array<string> = [];
    let currentComments: string[] = [];
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.trim().startsWith('#')) {
        // Preserve comments
        currentComments.push(line);
      } else {
        // Label or empty line
        const match = line.match(/^\s*([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim();
          labels[key] = value;
          comments[key] = currentComments;
          order.push(key);
          currentComments = [];
        }
      }
    }
    return [labels, comments, order];
  }
  
  function generateOutputContent(comments: Record<string, string[]>, labels: Record<string, string>, order: string[]) {
    const lines = [];
    for (const key of order) {
      const label = labels[key];
      const associatedComments = comments[key] || [];
      lines.push(...associatedComments, `${key}=${label}`);
    }
    return lines.join('\n');
  }

export function importMissingLabels(currentFile: string, importFile: string) {
  try {
    const currentContent = fs.readFileSync(currentFile, 'utf-8');
    const importContent = fs.readFileSync(importFile, 'utf-8');

    const [currentLabels, currentComments, currentOrder]: any = extractLabelsAndComments(currentContent);
    const [importedLabels, importedComments ]: any = extractLabelsAndComments(importContent);

    const mergedLabels: Record<string, string> = {};
    const mergedComments: Record<string, string[]> = {};
    const mergedOrder: string[] = [];

    // Associate existing comments with existing labels
    for (const key of currentOrder as Array<string>) {
      if (importedLabels[key]) {
        // Existing label from both files
        mergedLabels[key] = importedLabels[key];
        mergedComments[key] = importedComments[key] || [];
      } else {
        // Existing label only in the current file
        mergedLabels[key] = currentLabels[key];
        mergedComments[key] = currentComments[key] || [];
      }
      mergedOrder.push(key);
    }

    // Add missing labels from the import file
    for (const key of Object.keys(importedLabels)) {
      if (!currentLabels[key]) {
        // Missing label from the current file
        mergedLabels[key] = importedLabels[key];
        mergedComments[key] = importedComments[key];
        mergedOrder.push(key);
      }
    }

    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const fullRange = new vscode.Range(
            new vscode.Position(0, 0), // Start position (line 0, character 0)
            new vscode.Position(editor.document.lineCount, 0) // End position (end of document)
          );
      const insertText = generateOutputContent(mergedComments, mergedLabels, mergedOrder);
      editor.edit(editBuilder => {
        editBuilder.replace(fullRange, insertText);
      });

      vscode.window.showInformationMessage('Labels imported successfully.');
    }
  } catch (error: any) {
    vscode.window.showErrorMessage(`Error importing labels: ${error?.message}`);
  }
}

