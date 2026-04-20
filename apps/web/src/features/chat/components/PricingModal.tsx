"use client";

import { X, Zap, Crown, Building2, Check } from "lucide-react";

export default function PricingModal({ onClose }: { onClose: () => void }) {
  const plans = [
    {
      name: "Free",
      icon: Zap,
      price: "$0",
      period: "forever",
      description: "For individuals getting started",
      color: "from-gray-400 to-gray-500",
      buttonStyle: "border border-border-light text-text-primary hover:bg-card-hover",
      features: [
        "50 messages per day",
        "Basic AI models",
        "Chat history (7 days)",
        "Community support",
      ],
    },
    {
      name: "Pro",
      icon: Crown,
      price: "$19",
      period: "per month",
      description: "For power users and professionals",
      color: "from-violet-500 to-indigo-500",
      buttonStyle: "bg-primary-500 text-white hover:bg-primary-600",
      popular: true,
      features: [
        "Unlimited messages",
        "GPT-4, Claude & more",
        "Unlimited chat history",
        "Deeper Research mode",
        "File uploads (50MB)",
        "Priority support",
      ],
    },
    {
      name: "Team",
      icon: Building2,
      price: "$49",
      period: "per user/month",
      description: "For teams and organizations",
      color: "from-emerald-500 to-teal-500",
      buttonStyle: "border border-border-light text-text-primary hover:bg-card-hover",
      features: [
        "Everything in Pro",
        "Team workspace",
        "Admin dashboard",
        "API access",
        "Custom AI training",
        "Dedicated support",
      ],
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in"
      onMouseDown={onClose}
    >
      <div
        className="bg-card rounded-2xl shadow-2xl w-full max-w-[780px] mx-4 max-h-[90vh] overflow-y-auto animate-slide-up"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 pt-6 pb-4">
          <div>
            <h2 className="text-[20px] font-bold text-text-primary">Upgrade your plan</h2>
            <p className="text-[13px] text-text-secondary mt-0.5">Choose the plan that works best for you</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-hover-bg text-text-muted cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 pb-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border p-5 transition-all ${
                plan.popular
                  ? "border-primary-300 shadow-md shadow-primary-100"
                  : "border-border-light hover:border-primary-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary-500 text-white text-[10.5px] font-semibold">
                  Most Popular
                </span>
              )}
              <div
                className={`w-9 h-9 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center mb-3`}
              >
                <plan.icon className="w-4.5 h-4.5 text-white" />
              </div>
              <h3 className="text-[15px] font-semibold text-text-primary">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mt-1 mb-1">
                <span className="text-[28px] font-bold text-text-primary">{plan.price}</span>
                <span className="text-[12px] text-text-muted">/{plan.period}</span>
              </div>
              <p className="text-[12px] text-text-secondary mb-4">{plan.description}</p>
              <button
                className={`w-full py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${plan.buttonStyle}`}
              >
                {plan.name === "Free" ? "Current Plan" : `Get ${plan.name}`}
              </button>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[12px] text-text-secondary">
                    <Check className="w-3.5 h-3.5 text-primary-500 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
