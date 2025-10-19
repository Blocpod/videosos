"use client";

import { Bot, Film, Globe, Lock, Palette, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Features() {
  const t = useTranslations("landing.features");

  const features = [
    {
      icon: Bot,
      title: t("dualAI.title"),
      description: t("dualAI.description"),
    },
    {
      icon: Lock,
      title: t("privacy.title"),
      description: t("privacy.description"),
    },
    {
      icon: Film,
      title: t("timeline.title"),
      description: t("timeline.description"),
    },
    {
      icon: Palette,
      title: t("multiModal.title"),
      description: t("multiModal.description"),
    },
    {
      icon: Zap,
      title: t("clientSide.title"),
      description: t("clientSide.description"),
    },
    {
      icon: Globe,
      title: t("international.title"),
      description: t("international.description"),
    },
  ];

  return (
    <section id="features" className="py-20 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
          <p className="text-gray-400">{t("subtitle")}</p>
        </div>

        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:border-white/20 transition-colors"
            >
              <feature.icon className="w-12 h-12 mb-4 text-white/80" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
