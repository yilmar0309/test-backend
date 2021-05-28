import { Response } from "express"

/**
 * @author Alexis Noriega
 * @param error Boolean to indicate if there is an error
 * @param nameFunc Name of the function that was executed
 * @param message Description of the response
 * @param code Response code
 * @param data Response data
 * @version 1.0 Function version
 */
export const reponseJson: any = async (
  error: boolean,
  nameFunc: string,
  message: string,
  code: number,
  data: any,
  response: Response
) => {
  response.status(code).send({
    error,
    nameFunc,
    message,
    data,
  })
}