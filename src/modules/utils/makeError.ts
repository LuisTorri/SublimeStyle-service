import ErrorDto from "../dto/ErrorDto";

export default function makeError(
  code: number,
  message: string,
  err: any
): ErrorDto {
  console.error("Error get", new Date(), "code", code, "message", message, err);
  return {
    code,
    message,
  };
}
