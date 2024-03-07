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

	statusBarMemoryItem.text= `$(memory-icon) ${prettyBytes(m.used-m.buffcache)}/${prettyBytes(m.total,{binary:true})}`;
	statusBarMemoryItem.show();
	statusCpuItem.text= `$(chip-icon)${cl.currentLoad.toFixed(2)}%`;
	statusCpuItem.show();
	statusDiskItem.text= `$(database)${prettyBytes(totalDiskUsed)}/${prettyBytes(totalDiskSize,{binary:true})}`;
	statusDiskItem.show();
  };

// This method is called when your extension is deactivated
export function deactivate() {}