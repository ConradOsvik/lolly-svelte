export function focusFirstChild(node: HTMLElement) {
    (node.childNodes[0] as HTMLElement).focus()
}