import { ACTION_TYPES } from "../../actions/actionTypes";

export function changeContentInput(content: string) {
  return {
    type: ACTION_TYPES.SPAM_FILTER_CHANGE_CONTENT_INPUT,
    payload: {
      content,
    },
  };
}
