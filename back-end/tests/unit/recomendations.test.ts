import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import * as createRecommendationFactory from "../int/factories/createRecommendationFactory";
import * as errors from "../../src/utils/errorUtils";

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Voucher Service", () => {
  it("should create a recommendation", async () => {
    const recommendation = createRecommendationFactory.generate();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {});

    await recommendationService.insert(recommendation);

    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });

  it("should upvote a recommendation", async () => {
    const recommendation = createRecommendationFactory.generate();
    const id = 1;

    jest
      .spyOn(recommendationService, "getById")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => recommendation);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {});

    await recommendationService.upvote(id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });
});
