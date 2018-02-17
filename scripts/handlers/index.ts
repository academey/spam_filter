import HandlerWrapper from "./handlerWrapper";
// List of handlers
import render from "./frontRender";
import isSpam from "./isSpam";

const handlers = {
  render: HandlerWrapper.safelyWrap(render),
  isSpam: isSpam,
};

export = handlers;
