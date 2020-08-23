const myKoa = {
  info: { name: 'koa' },
  get name() {
    return this.info.name
  },

  set name(val) {
    this.info.name = val
  }
}

console.log(myKoa.name);
myKoa.name = '123';
console.log(myKoa.name);