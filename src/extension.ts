import * as vscode from 'vscode';
import prettyBytes from 'pretty-bytes';
import { currentLoad, fsSize, mem } from "systeminformation"

let statusBarMemoryItem: vscode.StatusBarItem;
let statusCpuItem: vscode.StatusBarItem;
let statusDiskItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	statusBarMemoryItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right
	);
	statusCpuItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right
	);
	statusDiskItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right
	);
	setInterval(memText, 3000);
}

const memText = async () => {
	const m = await mem();
	const cl = await currentLoad();
	let fsSizes = await fsSize();
	let totalDiskSize=0;
	let totalDiskUsed=0;
	for (let fsSize of fsSizes) {
		totalDiskSize+=fsSize.size;
		totalDiskUsed+=fsSize.used;
	}

	const totalDisk = fsSizes[0].size / 1024 / 1024 / 1024;
	const usedDisk = fsSizes[0].used / 1024 / 1024 / 1024;

	statusBarMemoryItem.text= `$(server) ${prettyBytes(m.active)}`;
	statusBarMemoryItem.show();
	statusCpuItem.text= `$(pulse)${cl.currentLoad.toFixed(2)}%`;
	statusCpuItem.show();
	statusDiskItem.text= `$(database)${prettyBytes(totalDiskUsed)}/${prettyBytes(totalDiskSize)} | ${prettyBytes(usedDisk)}/${prettyBytes(totalDisk)}`;
	statusDiskItem.show();
  };

// This method is called when your extension is deactivated
export function deactivate() {}