module.exports = function (source) {
  return ` var style = document.createElement('style');
  style.innerHTML =  ${source}
  document.head.appendChild(style)
  `;
};
