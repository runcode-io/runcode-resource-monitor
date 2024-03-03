import * as vscode from 'vscode';
import prettyBytes from 'pretty-bytes';
import { currentLoad, fsStats, mem, networkStats } from "systeminformation"

let statusBarMemoryItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	statusBarMemoryItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right
	);
	setInterval(memText, 3000);
}

const memText = async () => {
	const m = await mem();
	statusBarMemoryItem.text= `Memory: ${prettyBytes(m.active)}`;
	statusBarMemoryItem.show();
  };

// This method is called when your extension is deactivated
export function deactivate() {}