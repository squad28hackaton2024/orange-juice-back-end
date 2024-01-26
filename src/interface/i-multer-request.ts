import { FastifyRequest } from "fastify";

export interface IMulterRequest extends FastifyRequest {
    file?: File
}