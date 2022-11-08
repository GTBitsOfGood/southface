import mongoDB from "../index";
import Plan from "../models/Plan";

import { Plan as PlanType } from "src/utils/types";

export async function createPlan(plan: PlanType) {
    await mongoDB();

    const newPlan = await Plan.create(plan);

    return newPlan;
}

export async function updatePlanById(
  id: string,
  updatedPlan: Partial<PlanType>
) {
  await mongoDB();

  await Plan.findOneAndUpdate({ _id: id }, updatedPlan);
}

export async function deletePlanById(id: string) {
  await mongoDB();

  await Plan.findOneAndRemove({ _id: id });
}

export async function getPlanById(id: string) {
  await mongoDB();

  const plan = await Plan.find({ _id: id });

  return plan;
}

export async function getPlans(userId: string) {
  await mongoDB();

  return Plan.find({ userId: userId });
}
