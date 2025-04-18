export const CODE_STATUS_MAP: Record<ErrorCode, number> = {
  INVALID_PARAMETERS: 400,
  INVALID_FILTER_CRITERIA: 400,
  INVALID_SORT: 400,
  UNAUTHORIZED: 401,
  USER_NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  ACCOUNT_ALREADY_EXISTS: 409,
  ACCOUNT_NOT_FOUND: 404,
  ACCOUNT_IS_ALREADY_CREATOR: 409,
  ACCOUNT_IS_ALREADY_PROMOTER: 409,
  USERTYPE_NOT_FOUND_IN_GROUPS: 404,
  USERNAME_ALREADY_EXISTS: 409,
  INVALID_TOKEN: 401,
  NO_SEARCH_RESULT: 500, // this is a special case when a response is not sent by grpc
  NOT_FOUND: 404,
  ALREADY_EXISTS: 409,
  UNIMPLEMENTED: 500,
};

export enum ErrorCode {
  INVALID_PARAMETERS = "INVALID_PARAMETERS",
  INVALID_FILTER_CRITERIA = "INVALID_FILTER_CRITERIA",
  INVALID_SORT = "INVALID_SORT",
  UNAUTHORIZED = "UNAUTHORIZED",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  ACCOUNT_ALREADY_EXISTS = "ACCOUNT_ALREADY_EXISTS",
  ACCOUNT_NOT_FOUND = "ACCOUNT_NOT_FOUND",
  ACCOUNT_IS_ALREADY_CREATOR = "ACCOUNT_IS_ALREADY_CREATOR",
  ACCOUNT_IS_ALREADY_PROMOTER = "ACCOUNT_IS_ALREADY_PROMOTER",
  USERTYPE_NOT_FOUND_IN_GROUPS = "USERTYPE_NOT_FOUND_IN_GROUPS",
  USERNAME_ALREADY_EXISTS = "USERNAME_ALREADY_EXISTS",
  INVALID_TOKEN = "INVALID_TOKEN",
  NO_SEARCH_RESULT = "NO_SEARCH_RESULT",
  NOT_FOUND = "NOT_FOUND",
  ALREADY_EXISTS = "ALREADY_EXISTS",
  UNIMPLEMENTED = "UNIMPLEMENTED",
}
