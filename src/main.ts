function createHTMLElement(
  tag: string = 'button',
  text: string = 'button',
  id?: string,
) {
  const element = document.createElement(tag);
  if (id) {
    element.id = id;
  }
  element.innerText = text;
  return element;
}
// const newElement = createHTMLElement('div', 'some text');
// console.log(newElement);
// document.body.append(newElement);

// const element = createHTMLElement();
// console.log(newElement);
// document.body.append(element);
function logArgs(...args: any[]) {
  if (!args.length) {
    return;
  }
  console.log(args);
  for (let argument of args) {
    console.log(argument);
  }
  console.log('Больше аргументов нету');
}
logArgs(1, 2, 3);

const sayHello = function () {
  console.log('hello');
};
sayHello();
const sayBye = () => console.log('bye');
sayBye();

const brokenLinks: string[] = ['vk', 'youtube', 'facebook'];
// https://youtube.com
const fixLink = (links: string[]) => {
  const fixedLinks = links.map((link) => `https://${link}.com`);
  return fixedLinks.map((link) => `Ссылка: ${link}`).join('\n');
};
console.log(fixLink(brokenLinks));
