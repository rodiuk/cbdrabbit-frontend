export function newTabOpen(url: string) {
  let anchorElement = document.createElement("a");
  anchorElement.href = url;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement);
}
