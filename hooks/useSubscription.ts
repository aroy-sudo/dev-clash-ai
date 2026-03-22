'use client';

import { useAuth, useUser } from "@clerk/nextjs";
import { PLANS, PLAN_LIMITS, PlanType } from "@/lib/subscription-constants";

export const useSubscription = () => {
    const { isLoaded: isAuthLoaded } = useAuth();
    const { isLoaded: isUserLoaded } = useUser();
    
    const isLoaded = isAuthLoaded && isUserLoaded;

    const plan: PlanType = PLANS.PRO;

    return {
        plan,
        limits: PLAN_LIMITS[plan],
        isLoaded,
    };
};
