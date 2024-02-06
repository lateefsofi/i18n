# VSCode i18n Importer Extension

## Overview

This Visual Studio Code (VSCode) extension provides functionality to work with i18n (internationalization) files. It allows you to sort labels while retaining comments and import missing i18n labels from a selected file into the currently opened file in the editor.

## Features

### 1. Sort Labels and Retain Comments

This feature allows you to sort the labels in your i18n file while preserving comments associated with each label. It ensures a clean and organized arrangement of labels in your file.

#### How to Use:

1. Open the i18n file in the editor.
2. Select file content to sort
3. Invoke the sorting command through the VSCode command palette.
4. Search "Sort Lines" and hit enter
5. Your selected i18n labels should be sorted now

### 2. Import Missing i18n Labels

This feature enables you to import missing i18n labels from a selected file into the currently opened i18n file in the editor. It updates existing labels, associates comments, and adds missing labels.

#### How to Use:

1. Open the i18n file in the editor where you want to import labels.
2. Invoke the import command through the VSCode command palette.
3. Search "Import Missing Labels" and hit enter
4. Select the i18n file containing missing labels.

### 3. Import Missing i18n Labels and exclude labels matching pattern

This feature enables you to import missing i18n labels from a selected file into the currently opened i18n file in the editor but ignore those labels matching the pattern. It updates existing labels, associates comments, and adds missing labels excluding labels matching the pattern. Pattern can be specified in the settings for "excludePattern" parameter, its default value is "COMMON_". 

#### How to Use:

1. Open the i18n file in the editor where you want to import labels.
2. Invoke the import command through the VSCode command palette.
3. Search "Import Missing Labels" and hit enter
4. Select the i18n file containing missing labels.

## Installation

1. Install the extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=LateefSofi.i18nmaster).
2. Reload VSCode or restart the editor.

## Usage

1. Open the i18n file you want to work with.
2. Use the provided commands in the command palette (`Ctrl + Shift + P` or `Cmd + Shift + P` on macOS).
3. Follow the prompts or select the desired action.

## Contributing

Feel free to contribute to the development of this extension. Fork the repository, make your changes, and submit a pull request.

## Issues and Feedback

If you encounter any issues or have feedback, please report them on the [GitHub Issues](https://github.com/lateefsofi/i18n/issues) page.

## License

This project is licensed under the [MIT License](LICENSE).