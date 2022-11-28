import { NextFunction, Request, Response } from "express";
import { AddressRepository, Filter } from "@repository/AddressRepository";
import { ExpressError } from "utils/ExpressError";
import { JsonConverter } from "utils/JsonConverter";
import { validateOrReject } from "class-validator";

export class AddressController {
  private addressRepository: AddressRepository;
  private jsonConverter: JsonConverter;

  constructor() {
    this.addressRepository = new AddressRepository();
    this.jsonConverter = new JsonConverter();
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const query = request.query;
    if (query?.filter) {
      const filter = this.jsonConverter.convertJsonToObject<Filter>(
        query?.filter
      );
      return await this.addressRepository.findWithFilter(filter);
    }

    return this.addressRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.addressRepository.findOne({ where: { id: request.params.id } });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const addressData = request.body;
    const address = this.addressRepository.create(addressData);
    await validateOrReject(address);
    return this.addressRepository.save(address);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const addressToRemove = await this.addressRepository.findOneBy({
      id: request.params.id,
    });
    if (!addressToRemove)
      throw new ExpressError("Endereco não encontrado", 404);

    await this.addressRepository.remove(addressToRemove);
    await response.status(204).send();
  }
}
