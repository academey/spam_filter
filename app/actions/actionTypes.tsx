export const ACTION_TYPES = {
  SIGN_IN_CHANGE_EMAIL_INPUT: Symbol("SIGN_IN.CHANGE_EMAIL_INPUT"),
  SIGN_IN_CHANGE_PASSWORD_INPUT: Symbol("SIGN_IN.CHANGE_PASSWORD_INPUT"),

  SIGN_UP_CHANGE_EMAIL_INPUT: Symbol("SIGN_UP.CHANGE_EMAIL_INPUT"),
  SIGN_UP_CHANGE_PASSWORD_INPUT: Symbol("SIGN_UP.CHANGE_PASSWORD_INPUT"),
  SIGN_UP_CHANGE_REPEAT_PASSWORD_INPUT: Symbol("SIGN_UP.CHANGE_REPEAT_PASSWORD_INPUT"),

  SPAM_FILTER_CHANGE_CONTENT_INPUT: Symbol("SPAM_FILTER.CHANGE_CONTENT_INPUT"),

  GLOBAL_LOCATION_CHANGE: "@@router/LOCATION_CHANGE",
  GLOBAL_ALERT_NOTIFICATION: Symbol("GLOBAL_ALERT_NOTIFICATION"),
  GLOBAL_CLEAR_NOTIFICATION: Symbol("GLOBAL_CLEAR_NOTIFICATION"),
};
