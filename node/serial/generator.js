/**
 * Generator
 */
function* func() {
  console.log("one");
  yield '1';
  console.log("two");
  yield '2';
  console.log("three");
  return '3';
}
const f = func();
// console.log('next:', f.next());
// console.log('next:', f.next());
// console.log('next:', f.next());
// console.log('next:', f.next());

// for (const [key, value] of func()) {
//   console.log(`${key}: ${value}`);
// }