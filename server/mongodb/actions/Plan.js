import mongoDB from "../index";
import Plan from "../models/Plan";

export async function createPlan(plan) {
  await mongoDB();

  const newPlan = await Plan.create(plan);

  return newPlan;
}

export async function updatePlanById(id, updatedPlan) {
  await mongoDB();

  await Plan.findOneAndUpdate({ _id: id }, updatedPlan);
}

export async function deletePlanById(id) {
  await mongoDB();

  await Plan.findOneAndRemove({ _id: id });
}

export async function getPlanById(id) {
  await mongoDB();

  const plan = await Plan.find({ _id: id });

  return plan;
}

export async function getPlans(userId) {
  await mongoDB();

  return Plan.find({ userId: userId });
}
