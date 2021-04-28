import EventEmitter from "events";

let ee = new EventEmitter();
export default ee;

// ee.on('message', function (text) {
//   console.log(text)
// })
// ee.emit('message', 'hello world')
