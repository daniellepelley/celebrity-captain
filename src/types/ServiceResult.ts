type SuccessServiceResult<T> = {
  status: "success",
  payload: T
}

type NotFoundServiceResult = {
  status: "notfound"
}

type ServiceResult<T> = SuccessServiceResult<T> | NotFoundServiceResult;

export default ServiceResult;
