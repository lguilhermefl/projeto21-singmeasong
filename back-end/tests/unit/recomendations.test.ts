import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import * as recommendationFactory from "./factories/recommendationFactory";
import * as errors from "../../src/utils/errorUtils";

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Recommendation Service", () => {
  it("should create a recommendation", async () => {
    const { recommendationInsert } = recommendationFactory.generate();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {});

    await recommendationService.insert(recommendationInsert);

    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });

  it("should return conflict error when creating a recommendation with name that exists", async () => {
    const { recommendation, recommendationInsert } =
      recommendationFactory.generate();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => recommendation);

    const response = recommendationService.insert(recommendationInsert);

    expect(response).rejects.toEqual(
      errors.conflictError("Recommendations names must be unique")
    );
    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).not.toBeCalled();
  });

  it("should upvote a recommendation", async () => {
    const { recommendation } = recommendationFactory.generate();

    jest
      .spyOn(recommendationService, "getById")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => recommendation);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {});

    await recommendationService.upvote(recommendation.id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });

  it("should return not found when trying to upvote a recommendation that doesn't exist", () => {
    const { recommendation } = recommendationFactory.generate();

    jest
      .spyOn(recommendationService, "getById")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {});

    const response = recommendationService.upvote(recommendation.id);

    expect(response).rejects.toEqual(errors.notFoundError());
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).not.toBeCalled();
  });

  it("should downvote a recommendation", async () => {
    const { recommendation } = recommendationFactory.generate();

    jest
      .spyOn(recommendationService, "getById")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => recommendation);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => recommendation);

    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {});

    await recommendationService.downvote(recommendation.id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    expect(recommendationRepository.remove).not.toBeCalled();
  });

  it("should return not found when trying to downvote a recommendation that doesn't exist", () => {
    const { recommendation } = recommendationFactory.generate();

    jest
      .spyOn(recommendationService, "getById")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {});

    const response = recommendationService.downvote(recommendation.id);

    expect(response).rejects.toEqual(errors.notFoundError());
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).not.toBeCalled();
    expect(recommendationRepository.remove).not.toBeCalled();
  });

  it("should remove a recommendation that has score less or equal than -5 when trying to downvote it", async () => {
    const { recommendation } = recommendationFactory.generate();
    recommendation.score = -6;

    jest
      .spyOn(recommendationService, "getById")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => recommendation);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => recommendation);

    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {});

    await recommendationService.downvote(recommendation.id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    expect(recommendationRepository.remove).toBeCalled();
  });

  it("should get all recommendations", async () => {
    const { recommendation } = recommendationFactory.generate();

    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => recommendation);

    await recommendationService.get();

    expect(recommendationRepository.findAll).toBeCalled();
  });

  it("should get an amount of recommendations ordered by score", async () => {
    const { recommendation } = recommendationFactory.generate();
    const amount = 10;

    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockImplementationOnce((): any => recommendation);

    await recommendationService.getTop(amount);

    expect(recommendationRepository.getAmountByScore).toBeCalled();
  });
});
