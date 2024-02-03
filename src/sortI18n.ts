import * as vscode from 'vscode';

export function sortSelectedText() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const selection = editor.selection;
    const text = editor.document.getText(selection);

    const lines = text.split('\n');
    const commentsAndKeyValuePairs = [];
    let currentComments = [];

    for (const line of lines) {
      if (line.trim().startsWith('#')) {
        // Preserve comments
        currentComments.push(line);
      } else if (line.trim() !== '') {
        // Ignore empty lines
        commentsAndKeyValuePairs.push({ comments: currentComments, keyValue: line });
        currentComments = [];
      }
    }

    // Sort key-value pairs
    commentsAndKeyValuePairs.sort((a, b) => a.keyValue.localeCompare(b.keyValue));

    // Combine sorted key-value pairs and comments
    const sortedContent = commentsAndKeyValuePairs
      .map(entry => [...entry.comments, entry.keyValue])
      .flat()
      .join('\n');

    // Replace the selected text with the sorted content
    editor.edit(editBuilder => {
      editBuilder.replace(selection, sortedContent);
    });
  }
}