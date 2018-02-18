import HandlerWrapper from "./handlerWrapper";
// List of handlers
import render from "./frontRender";
import isSpam from "./isSpam";
// import testfunc from './testfunc';

const handlers = {
  render: HandlerWrapper.safelyWrap(render),
  isSpam: isSpam,
};

module.exports = handlers;
