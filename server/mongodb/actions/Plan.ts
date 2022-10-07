import mongoDB from "../index";
import Plan from "../models/Plan";

import { Plan as PlanType } from "src/utils/types";

export async function createPlan(plan: PlanType) {
    await mongoDB();
    
    const newPlan = await Plan.create(plan, function (err, docs) {
        if (err){
            console.log(err)
        }
        else {
            console.log("Created Plan: ", docs);
        }
    });

    return newPlan;
}

export async function updatePlanById(id: string, updatedPlan: Partial<PlanType>) {
    await mongoDB();

    await Plan.findOneAndUpdate({_id: id}, updatedPlan);
}

export async function deletePlanById(id: string) {
    await mongoDB();

    await Plan.findOneAndRemove({_id: id });
}

export async function getPlanById(id: string) {
    await mongoDB();

    const plan = await Plan.find({_id: id});

    return plan;
}
