// const add = (x, y) => x + y;
// const square = z => z * z;

// // const fn = (x, y) => square(add(x, y));

// // const compose = (fn1, fn2) => (...args) => fn2(fn1(...args));

// const compose = (...[first, ...other]) => (...args) => {
//   let ret = first(...args);
//   other.forEach(fn => {
//     ret = fn(ret);
//   })
//   return ret
// }

// const fn = compose(add, square);

// console.log(fn(1, 2));

//洋葱
function compose(middleware) {
  return function () {
    return dispatch(0); //先执行第一层
    function dispatch(i) {
      let fn = middleware[i];
      if (!fn) {
        return Promise.resolve();
      }
      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1);
        })
      );
    }
  };
}
async function fn1(next) {
  console.log("fn1");
  await next(); //f2
  console.log("end fn1");
}
async function fn2(next) {
  console.log("fn2");
  await delay();
  await next(); //f3
  console.log("end fn2");
}
function fn3(next) {
  console.log("fn3");
}
function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}
const middleware = [fn1, fn2, fn3];
const finalFn = compose(middleware);
finalFn();