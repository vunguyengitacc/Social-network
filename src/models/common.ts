export interface IRequestParam {
  [key: string]: any;
}

export interface IResponse<T> {
  status: string;
  data: { [key: string]: T };
}

export interface IResponseList<T> {
  status: string;
  data: {
    [key: string]: any[] | T[];
  };
}
