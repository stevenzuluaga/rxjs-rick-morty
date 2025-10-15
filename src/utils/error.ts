import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
  BadGatewayException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AxiosError } from 'axios';

export const mapAxiosErrorToMessage = (error: AxiosError) => {
  switch (error.status) {
    case 400:
      throw new BadRequestException(
        'Bad Request - The server could not understand the request due to invalid syntax.',
      );
    case 401:
      throw new UnauthorizedException(
        'Unauthorized - The client must authenticate itself to get the requested response.',
      );
    case 403:
      throw new ForbiddenException(
        'Forbidden - The client does not have access rights to the content.',
      );
    case 404:
      throw new NotFoundException(
        'Not Found - The server can not find the requested resource.',
      );
    case 500:
      throw new InternalServerErrorException(
        "Internal Server Error - The server has encountered a situation it doesn't know how to handle.",
      );
    case 502:
      throw new BadGatewayException(
        'Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server.',
      );
    case 503:
      throw new ServiceUnavailableException(
        'Service Unavailable - The server is not ready to handle the request, often due to maintenance or overload.',
      );
    default:
      throw new Error(
        `Unexpected Error - An unexpected error occurred with status code ${error.status}.`,
      );
  }
};
